---
title: Asistente de IA para documentos de empresa
subtitle: Preguntas en lenguaje natural, respuestas con fuente desde los propios documentos, funcionando en la red propia
date: 2026-11-13
description: "Un asistente de chat como ChatGPT que busca y lee documentos de empresa y cita sus fuentes. En la red propia, con inicio de sesión SSO seguro, roles, límites de coste y modelos de lenguaje en Microsoft Azure en la UE. Desde conectar un gestor documental existente hasta montarlo todo desde cero."
contactHeading: "¿Preguntar a los documentos en lugar de buscarlos?"
---

Los documentos están todos ahí. Contratos, informes, correspondencia, archivados en el gestor documental, en unidades de red, en buzones de correo. Lo difícil es llegar a ellos: para encontrar algo hay que saber cómo se llama, dónde está y qué palabra exacta aparece en el texto. Quien no lo sabe, le pregunta a una compañera. O lo deja estar.

Construyo un asistente al que se le pregunta como a ChatGPT. Busca en los documentos de la empresa, lee los relevantes y responde con la fuente, de modo que cada afirmación se puede comprobar con un clic.

## Situación de partida típica

- La búsqueda solo encuentra lo que se escribe palabra por palabra, y solo si se sabe dónde buscar
- Un asistente de IA sería práctico, pero los documentos de la empresa no deberían acabar en una herramienta de chat ajena
- Protección de datos, permisos de acceso, costes recurrentes: las preguntas están hechas, nadie las ha respondido
- La factura de IA llega como una sola cifra, y nadie sabe quién ha consumido qué

## Alcance del servicio

- **Interfaz de chat que se usa como ChatGPT**, alojada en un servidor propio dentro de la red de la empresa y accesible solo internamente
- **Inicio de sesión único (SSO) seguro** con la cuenta corporativa existente, con autenticación multifactor. Sin login aparte con contraseña; grupos y roles vienen del directorio de usuarios existente
- **Acceso de solo lectura a los documentos.** Los roles controlan quién puede buscar, quién puede leer textos completos y qué áreas quedan protegidas
- **Modelos de lenguaje en Microsoft Azure en la UE**, en una suscripción propiedad de la empresa (detalles en la sección de protección de datos)
- **Control de costes:** presupuesto mensual con alertas, límites por grupo, consumo visible por empleado
- **Entrega completa:** código fuente, documentación, manual de operación, guía rápida, formación para el equipo y el administrador

Con la base en marcha, se puede ampliar. Más fuentes de datos. Crear y editar archivos Word, Excel y PDF directamente en el chat. Una búsqueda semántica que encuentra la cláusula aunque no comparta ni una palabra con la pregunta. O un gateway que desglosa los costes en euros por empleado. Cada cosa por separado, y solo cuando se vea que hace falta.

## Puntos de partida

No hace falta que exista nada. El punto de entrada depende de lo que ya hay:

- **Existe un gestor documental con índice de búsqueda.** Entonces se conecta el asistente, y lo que ya funciona se queda como está.
- **Los documentos existen, pero no se pueden buscar.** Entonces monto la indexación, para que el asistente tenga algo que encontrar.
- **Todavía no hay nada.** Entonces el proyecto abarca el paquete completo: gestión documental, indexación, servidor, inicio de sesión, suscripción de Azure y, encima, el asistente.

La mayoría de las empresas está en algún punto intermedio. Eso se aclara en la primera conversación.

## ¿Búsqueda de texto completo o búsqueda vectorial?

Para que el asistente encuentre algo, los documentos tienen que estar indexados. Hay dos caminos, y resuelven problemas distintos.

**La búsqueda de texto completo** encuentra documentos en los que los términos buscados aparecen literalmente. Para números de factura, nombres, importes o referencias de expediente es exactamente lo adecuado, porque ahí cuenta la coincidencia exacta, no el significado. Los documentos nuevos se encuentran al instante. Y donde ya existe un índice de búsqueda, no hace falta nada adicional. El límite: sin conocer los términos del documento, no se encuentra. El asistente lo compensa en parte probando por sí mismo varios términos y sinónimos, lo que a menudo da resultados igual de buenos.

**La búsqueda vectorial** encuentra además documentos que significan lo mismo pero están formulados de otra manera. La pregunta "¿Cómo salimos de este contrato?" encuentra entonces también la cláusula "extinción de la relación contractual", aunque no coincida ni una sola palabra. Merece la pena para preguntas de contenido sobre textos largos como contratos, informes o correspondencia. Técnicamente, los documentos se dividen en secciones, se procesan con un modelo de embeddings en Azure en la UE y se guardan en un índice vectorial propio, con los mismos filtros de roles y áreas que la búsqueda de texto completo. A tener en cuenta:

- En el primer procesamiento, todo el fondo documental se envía una vez a Azure en la UE
- Costes únicos para el fondo existente, después costes recurrentes pequeños solo para documentos nuevos y modificados
- Los documentos nuevos aparecen en la búsqueda vectorial solo tras la siguiente sincronización, en la de texto completo al instante

**En la práctica, ambas funcionan juntas** como búsqueda híbrida: texto completo para lo exacto, vectores para el significado. Lo sensato suele ser empezar con la búsqueda de texto completo y decidir, a partir de las preguntas de prueba y el piloto, si la búsqueda vectorial compensa el esfuerzo. Si no compensa, uno se ahorra costes y complejidad.

## Protección de datos: Microsoft Azure en la UE, en la suscripción propia

Los modelos de lenguaje funcionan con Azure OpenAI de Microsoft, en una región de la UE o en la zona de datos de la UE. Y en una suscripción de Azure propiedad de la empresa: la existente o una configurada para el proyecto. No en la mía, y sin terceros de por medio. Parece un detalle. Es la base de todo lo demás:

- **El contrato es con Microsoft.** El recurso, las claves y la factura pertenecen a la empresa, y el contrato de encargo de tratamiento se firma directamente con Microsoft. Tras la entrega, nada depende de mí.
- **El contenido de los documentos sale de la red de la empresa en una sola dirección:** hacia los modelos en la UE. La interfaz, la base de datos, los chats y los archivos subidos se quedan en el servidor propio.
- **Sin búsqueda web en el asistente documental.** Las funciones que envían consultas a internet quedan desactivadas ahí, para que ningún contenido de documentos acabe en una búsqueda.
- **Los chats se borran automáticamente**, junto con los archivos subidos y generados, tras un plazo que se fija libremente. Las copias de seguridad están cifradas.
- **Los administradores no leen los chats** salvo que se desee expresamente. En ese caso solo se evalúan consumo y costes.
- **Documentación para el delegado de protección de datos:** flujos de datos, ubicaciones de almacenamiento, conservación y política de borrado, descritos a nivel técnico.

Esto no sustituye el asesoramiento jurídico. Pero el delegado de protección de datos recibe algo concreto que revisar en lugar de una caja negra.

## Por qué el asistente no adivina

Un asistente que alucina es peor que ninguno. Por eso la mayor parte del trabajo no está en el modelo, sino en el entorno que lo rodea, el [harness](/de/blog/harness-engineering) (artículo en alemán).

En concreto: el asistente solo recibe las herramientas que de verdad necesita, como buscar, leer y abrir la fuente. Cualquier herramienta extra solo consumiría contexto. Sus instrucciones dicen "buscar, no adivinar", citar la fuente, preguntar si no hay resultados. Y sin un inicio de sesión válido o el rol adecuado, simplemente no ve ningún documento. Sin plan B, sin quizás.

Tampoco es la intuición la que decide si las respuestas sirven. La base son preguntas típicas del día a día, con las que el asistente se ajusta y se prueba; después unos pocos empleados hacen un piloto, y solo tras la aceptación llega a todo el equipo.

## Metodología

Empieza con un kick-off para tomar las decisiones que deben estar claras antes de construir: ¿quién puede ver qué? ¿Qué modelos? ¿Cuánto tiempo se guardan los chats y cuál es el presupuesto mensual? Después se avanza paso a paso, de la plataforma al asistente, hasta el piloto, la formación y la entrega. Cada paso termina con un resultado tangible.

Trabajo en remoto y me coordino directamente con el proveedor de IT cuando la red o la gestión de usuarios se gestionan externamente.

## Cómo se fijan los precios

Todo empieza con una conversación: ¿qué documentos, qué preguntas, quién debe ver qué, y qué existe ya? De ahí sale una propuesta con paquetes de trabajo individuales y un rango de esfuerzo por paquete. Se factura según el esfuerzo real, con un tope que no se supera sin acuerdo previo. Las ampliaciones se pueden contratar por separado, al inicio o más adelante.

Los costes recurrentes de los modelos de lenguaje los factura Microsoft directamente a través de la suscripción de Azure de la empresa, no a través de mí. La interfaz de chat no tiene costes de licencia. El código fuente de todo lo desarrollado a medida se entrega con un derecho de uso indefinido.

---

*No es un experimento con chatbots. Es un asistente que sabe dónde está escrito, y puede demostrarlo.*
