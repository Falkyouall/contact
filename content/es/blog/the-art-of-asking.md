---
title: El arte de preguntar
date: 2026-02-21
description: La curva de la trampa agéntica, Deep Thought y por qué saber qué preguntar importa más que saber cómo construirlo.
---

En la Guía del autoestopista galáctico, una civilización construye un superordenador llamado Deep Thought para responder a la pregunta definitiva sobre la vida, el universo y todo lo demás. Deep Thought calcula durante 7,5 millones de años y devuelve la respuesta: 42. El problema, claro, es que nadie sabe cuál era la pregunta real. La respuesta es perfecta. La pregunta nunca se definió.

No dejo de pensar en esa escena cuando veo cómo los desarrolladores interactúan con agentes de IA.

## La trampa agéntica

Peter Steinberger describió algo en el podcast de Lex Fridman que llama la trampa agéntica. Es una curva. En el lado izquierdo, empiezas con prompts simples. "Please fix this." Después descubres lo potentes que son los agentes y profundizas. Ocho agentes en paralelo, orquestación compleja, multi-checkouts, agentes encadenados, workflows de sub-agentes personalizados, una biblioteca de 18 slash commands diferentes. Estás organizado. Eres sofisticado. Tienes el control total.

Y entonces, si sigues avanzando, llegas a un lugar inesperado. De vuelta a prompts cortos. "Hey, mira estos archivos y luego haz estos cambios." El nivel élite, como dice Peter, es zen.

Esa curva es interesante no por los prompts en sí, sino por lo que cambia entre el lado izquierdo y el derecho. Los prompts parecen iguales. La persona detrás de ellos no.

## Qué piden los desarrolladores

He estado prestando atención a cómo los desarrolladores a mi alrededor hablan con los agentes. No lo que los agentes producen — lo que los desarrolladores piden. Y hay un patrón.

Al principio, la gente pide implementaciones. "Escríbeme un componente React que haga X con Y y Z." El prompt es una especificación. Cada detalle definido, porque el desarrollador sabe exactamente cómo debe verse el código y esencialmente lo dicta en lenguaje natural. El agente es un mecanógrafo.

Luego empiezan a pedir soluciones. "El flujo de login está roto, la sesión expira demasiado pronto, arréglalo." Menos prescripción, más intención. El agente tiene espacio para investigar, decidir un enfoque y ejecutar.

Pero las personas que más sacan de los agentes piden algo completamente diferente. Hacen preguntas. "¿Tienes alguna pregunta para mí?" Peter lo mencionó en la entrevista — le pregunta al agente si tiene preguntas, las escanea por encima, y a menudo la respuesta es simplemente "lee más código para responder tus propias preguntas." No está dirigiendo. Está teniendo una conversación con algo que ve el codebase desde cero en cada sesión.

El cambio no está en la complejidad del prompt. Está en lo que el desarrollador considera su trabajo. ¿Estás especificando código, resolviendo problemas o definiendo intención?

## El verdadero problema de Deep Thought

El chiste de la Guía del autoestopista funciona porque es absurdo. Pero el punto subyacente es afilado. Deep Thought no falló. Entregó exactamente lo que se pidió. La civilización falló porque pasó millones de años esperando una respuesta a una pregunta que nunca se molestó en formular bien.

Una versión de esto está ocurriendo ahora mismo en el desarrollo de software. Los agentes son asombrosamente capaces. Claude, Codex, lo que sea que uses — pueden navegar codebases, escribir tests, refactorizar módulos, entregar features. El cuello de botella no es la capacidad de la máquina para producir output. El cuello de botella es la capacidad del humano para definir qué importa.

Y definir qué importa no es un skill de prompting. Es un skill de ingeniería. Es una capacidad de pensamiento.

## El trasfondo que realmente necesitas

Peter hizo una observación sobre programadores experimentados que se me quedó grabada. Dijo que para algunos programadores de primer nivel, su experiencia es casi una carga en su capacidad de empatizar con el sistema. Saben exactamente cómo debe verse el código, hasta los nombres de variables y el manejo de casos extremos. Ese conocimiento hace difícil soltar y dejar que el agente aborde el problema de otra manera.

Pero hay una otra cara. Si no tienes suficiente trasfondo, no sabes qué preguntar. Puede que obtengas código funcional que resuelve el problema equivocado, o que lo resuelve de una forma que se desmorona a escala. El agente no te va a decir que tu arquitectura está mal si no conoce tus restricciones. No sabe qué vas a construir el mes que viene.

Entonces, ¿qué necesitas saber realmente en la era del desarrollo asistido por IA? Creo que es esto: necesitas entender los sistemas lo suficientemente bien como para hacer la pregunta correcta, pero con la soltura suficiente como para no dictar la respuesta.

Eso significa entender cómo encaja una aplicación web — qué hace el frontend, qué hace el backend, dónde vive el estado, cómo fluyen los datos. No necesariamente cómo escribir cada pieza a mano. Entender por qué elegirías PostgreSQL en lugar de Firebase para un caso de uso concreto, aunque nunca hayas escrito una migración SQL sin ayuda. Entender qué significa la conformidad WCAG para tus usuarios, aunque el agente genere el markup accesible.

Arquitectura, tradeoffs, necesidades del usuario, restricciones. Las cosas que no cambian cuando cambia la herramienta de implementación.

## 42

Deep Thought al final reveló que el problema no era calcular la respuesta — sino que se necesitaría un ordenador mucho más grande para descubrir la pregunta real. Ese ordenador resultó ser la Tierra misma. La pregunta requería vivir en ella. Experimentarla. No calcularla.

Hay algo honesto en eso. La pregunta correcta no viene de un system prompt ni de una cadena de agentes cuidadosamente diseñada. Viene de conocer tu dominio. De haber estado en la reunión donde el product owner explicó con qué luchan realmente los usuarios. De haber depurado una caída en producción a las 2 de la mañana y haber entendido, visceralmente, qué importa y qué no. De haber construido tres versiones de algo y saber qué decisiones tomarías diferente.

Peter habla de llorar el oficio de la programación, y lo entiendo. El estado de flujo de escribir código y encontrar una solución elegante — eso era real. Pero también lo replantea: no eres solo un programador. Eres un builder. Y construir nunca fue solo teclear.

Los desarrolladores que prosperen en la era agéntica no serán los que escriban los prompts más detallados o los que orquesten los pipelines de agentes más complejos. Serán los que sepan qué construir y por qué. Los que puedan mirar un codebase, el output de un agente, un conjunto de requisitos, y decir — esa no es la pregunta correcta. Déjame replantearla.

La respuesta siempre fue 42. Lo difícil siempre fue la pregunta.
