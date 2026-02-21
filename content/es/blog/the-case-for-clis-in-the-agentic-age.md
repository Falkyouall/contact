---
title: El caso de los CLIs en la era de los agentes
date: 2026-02-21
description: Los agentes de IA manejan mejor los comandos Unix que las interfaces gráficas. Eso tiene consecuencias para cómo construimos herramientas.
---

Está ocurriendo un cambio silencioso en cómo se construyen las herramientas para desarrolladores. Durante la última década, la dirección era clara: envuelve todo en un GUI, añade un dashboard, quizás una interfaz web. Los CLIs eran lo que mantenías a regañadientes para pipelines de CI y power users. Eso se está invirtiendo, y la razón es sorprendentemente mecánica.

Los agentes de IA son muy buenos usando herramientas de línea de comandos. Son malos navegando interfaces gráficas. Y a medida que más trabajo de desarrollo se delega a agentes, sobreviven las herramientas que los agentes pueden operar.

## Los agentes piensan en texto

Los Large Language Models procesan texto. Producen texto. Cuando un agente necesita interactuar con un sistema, la interfaz más natural es una donde tanto la entrada como la salida son texto. Eso es un CLI.

Esto no es un argumento teórico. El equipo de ingeniería de Vercel escribió sobre cómo reemplazaron la mayor parte de su tooling personalizado para agentes con una herramienta de filesystem y una herramienta de bash. Los resultados fueron concretos: el tiempo de ejecución bajó de 274,8 segundos a 77,4 segundos (3,5x más rápido), el consumo de tokens cayó de aproximadamente 102k a 61k tokens (37% menos), el número de pasos pasó de unos 12 a 7, y la tasa de éxito subió del 80% al 100%. Descubrieron que `grep`, `find`, `cat` y `ls` eran suficientes para que los agentes navegaran estructuras de datos complejas que antes requerían sistemas de recuperación construidos a medida.

Su conclusión fue directa: "Grep is 50 years old and still does exactly what we need. We were building custom tools for what Unix already solves."

Peter Steinberger hizo una observación similar sobre su propio workflow. Comentó que simplemente puede referirse a un CLI por nombre en las instrucciones de su agente. El agente prueba algo, el CLI muestra el menú de ayuda, el contexto ahora tiene la información completa de cómo funciona la herramienta, y a partir de ahí todo funciona. Sin definiciones de schema, sin overhead de registro de herramientas.

## El impuesto del context window

Aquí es donde se pone práctico. Cada herramienta a la que un agente tiene acceso cuesta tokens. La descripción de la herramienta, sus parámetros, su schema — todo eso se carga en el context window antes de que el agente haya empezado a trabajar.

Los servidores MCP (Model Context Protocol) son un buen ejemplo de este tradeoff. Proporcionan interfaces estructuradas y tipadas para que los agentes interactúen con servicios externos. Eso es útil. Pero tiene un coste. El servidor MCP de GitHub, por ejemplo, consume decenas de miles de tokens solo por estar registrado. Un desarrollador reportó que pasó de 34k a 80k tokens en Claude Code solo por añadir el MCP de GitHub. Otro análisis encontró que las herramientas MCP solas consumían el 16,3% del context window disponible — antes de un solo mensaje del usuario.

Peter Steinberger lo expresó de forma directa: "I don't have to pay a price for any tools, unlike MCPs which are a constant cost and garbage in my context. Use GitHub's MCP and see 23k tokens gone. Or use the `gh` cli which has basically the same feature set, models already know how to use it, and pay zero context tax."

El CLI `gh` y el servidor MCP de GitHub hacen aproximadamente lo mismo. Uno cuesta cero tokens por estar disponible. El otro quema contexto solo por existir.

## Por qué importa económicamente

Los tokens del context window no son gratis. Con facturación basada en API, cada token en el context window se cobra en cada request. Un overhead de 30k tokens por definiciones de herramientas significa 30k tokens de entrada adicionales en cada mensaje de una conversación. A lo largo de una sesión larga con docenas de intercambios, eso se acumula.

El precio por token ha bajado significativamente — alrededor del 80% desde 2023 según algunos análisis — pero el volumen de tokens que consumen los agentes ha aumentado drásticamente en el mismo periodo. Los agentes hacen múltiples tool calls por tarea, mantienen conversaciones largas y operan sobre codebases grandes. El precio por token bajó, pero el consumo total subió.

Las herramientas CLI evitan gran parte de esto. El agente ya sabe cómo usar `git`, `npm`, `docker`, `curl` y cientos de otras herramientas Unix estándar por sus datos de entrenamiento. Sin tool description necesaria. Sin definición de schema. Sin overhead de contexto. El agente simplemente ejecuta el comando, lee stdout, y sigue adelante.

## Datos estructurados, sin el impuesto de la estructura

Un argumento a favor de los GUIs y las APIs estructuradas es que proporcionan formatos de salida limpios y predecibles. Pero los CLIs también lo hacen, solo que de otra manera. Los comandos Unix canalizan texto. Devuelven JSON cuando se les pide (`gh pr list --json`). Soportan flags que controlan el nivel de detalle. Y los agentes son notablemente buenos parseando su output.

La filosofía Unix — herramientas pequeñas que hacen una cosa, componibles a través de pipes — resulta estar casi perfectamente alineada con cómo razonan los agentes. Un agente puede encadenar `ls | grep | head` para acotar lo que está mirando antes de gastar tokens leyendo archivos completos. Puede ejecutar `git log --oneline -5` para entender el historial reciente sin cargar todo el grafo de commits.

Este tipo de carga de contexto incremental y lazy es exactamente lo que mantiene bajo el consumo de tokens. El agente decide qué necesita, obtiene solo eso, y continúa. Compara esto con un servidor MCP que carga todo su schema en el context window sin importar si el agente necesita algo de ello o no.

## El ejemplo `gh` vs GitHub MCP

Esto vale la pena mirarlo de cerca porque ilustra el punto con claridad.

El servidor MCP de GitHub expone docenas de herramientas: crear issues, listar PRs, leer archivos, gestionar releases. Cada herramienta viene con una definición de JSON schema. Todas esas definiciones se cargan en el contexto inmediatamente. El overhead total se mide en decenas de miles de tokens.

El CLI `gh` hace todas las mismas cosas. `gh pr list`, `gh issue create`, `gh api repos/owner/repo/pulls/123/comments`. El agente conoce la sintaxis por los datos de entrenamiento. El overhead es cero tokens hasta que el agente realmente ejecuta un comando. Y cuando lo hace, recibe texto plano que es fácil de parsear y barato de incluir en el contexto.

Mismas capacidades. Coste de contexto dramáticamente diferente.

## Qué significa esto para los constructores de herramientas

Si estás construyendo herramientas para desarrolladores en 2026, el CLI no es una interfaz legacy que mantienes por compatibilidad. Es la interfaz principal para una base de usuarios creciente — los agentes de IA.

Algunas cosas se derivan de esto:

- **Texto entra, texto sale.** Si tu herramienta se puede operar completamente a través de stdin/stdout, los agentes pueden usarla sin ninguna capa adaptadora.
- **Un buen texto de ayuda importa más que nunca.** Cuando un agente se encuentra con un CLI desconocido, ejecuta `--help`. Si tu texto de ayuda es claro y completo, el agente se onboardea solo.
- **Los flags de salida JSON son estándar.** `--json` o `--output json` permite a los agentes obtener datos estructurados sin scrapear tablas formateadas.
- **Nada de input interactivo.** Los agentes no pueden navegar prompts ni menús. Cada operación debería poder expresarse como un solo comando con flags.

Nada de esto es consejo nuevo para el diseño de CLIs. La filosofía Unix lleva cincuenta años diciendo esto. Lo nuevo es que ahora hay una base de usuarios masiva y creciente — los agentes de IA — que recompensa exactamente estas propiedades.

## El péndulo oscila

Ya hemos pasado por ciclos antes. Mainframes a PCs, aplicaciones de escritorio a aplicaciones web, monolitos a microservicios. Cada cambio altera qué interfaces son óptimas.

El cambio hacia lo agéntico favorece interfaces de texto, herramientas componibles y carga de contexto lazy. Favorece los CLIs. No porque los GUIs vayan a desaparecer — los humanos siguen necesitando ver cosas — sino porque el consumidor de herramientas para desarrolladores que más rápido crece no tiene ojos.

Las herramientas que ganen en la era de los agentes serán las que sean fáciles de hablar. Y lo más fácil con lo que se puede hablar, resulta ser, es un command-line interface bien diseñado que habla Unix.
