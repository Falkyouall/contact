---
title: El arte de preguntar Pt. 2
date: 2026-04-22
description: Tickets complejos, la vergüenza que se desvanece, y por qué pedirle a la IA que explique un problema es la misma habilidad que pedirle que lo resuelva.
contactHeading: "¿Quieres mejorar el workflow de IA de tu equipo?"
---

Hace unos meses escribí [El arte de preguntar](/blog/the-art-of-asking) — sobre cómo los desarrolladores que más sacan de los agentes no especifican código, definen intención. Ese post iba sobre cómo hablas con los agentes cuando quieres que hagan algo.

Este va sobre cómo hablas con ellos cuando estás intentando entender algo.

## La pregunta que no hiciste

Cada desarrollador con el que he trabajado tiene el recuerdo de un ticket que no quería abrir. Un lío de criterios de aceptación, tres hilos de comentarios apuntando en direcciones distintas, un enlace de Figma de 2021, y una descripción que empieza con "Como hablamos en el refinement." Te quedas mirándolo una hora y no avanzas. No quieres preguntar en el canal porque es martes y ya has preguntado dos cosas esta semana. Así que cierras el ticket y coges otro más fácil.

Ese reflejo no es cuestión de skill. Es de vergüenza.

## Preguntar costaba de verdad

Había una cuenta social. Demasiadas preguntas en el standup y parecías junior. Preguntarle al senior por DM y sentías que le estabas robando tiempo. Postear en #dev-help y esperar, fingiendo trabajar en otra cosa mientras refrescabas Slack. Si no lo resolvías dentro de la ventana no escrita — quizá un día, quizá menos — le debías un café a alguien.

La mayoría lo internalizamos. Googleábamos bajo la mesa, scrolleábamos respuestas de Stack Overflow de 2014, probábamos tres cosas que no funcionaban antes de rendirnos.

Ese coste se fue.

## Preguntar para entender, no para construir

El post original iba sobre un cambio en cómo prompteas a los agentes para construir. De especificación ("escríbeme un componente React que haga X") a solución ("arregla el login flow") a intención ("¿tienes preguntas para mí?"). Modos distintos, el mismo skill de fondo — definir qué importa.

El segundo cambio es más sutil. Es pedirle a los agentes que te ayuden a *pensar*, no sólo a construir. Antes de escribir un prompt que pida código, puedes pasar veinte minutos pidiendo claridad.

"Resume este ticket en dos frases. ¿Cuál es el problema real del usuario?"
"Lista todas las suposiciones no dichas en esta descripción."
"¿Qué necesitarías saber antes de empezar?"
"Divídelo en las piezas más pequeñas que se puedan shippear de forma independiente."
"¿Qué preguntas haría un senior engineer sobre este ticket antes de tocar nada?"

Nada de eso produce código. Produce comprensión. El código viene después.

## Un ticket de Jira, en la práctica

La semana pasada miré un ticket con cinco criterios de aceptación, tres de los cuales referenciaban docs internos que no había leído. El instinto viejo habría sido leer primero todos los docs, armar un modelo mental durante dos horas, y luego empezar. El instinto nuevo es distinto.

Pegué el ticket en [Claude](https://claude.ai) y pregunté:

- ¿Qué está pidiendo este ticket en una frase?
- ¿Cuál es el cambio más pequeño que satisface al menos uno de los criterios de aceptación?
- ¿Qué criterios dependen entre sí y cuáles son independientes?
- ¿Qué suposiciones está haciendo el autor que podrían no cumplirse?
- ¿Qué le preguntarías al autor del ticket si pudieras?

Cinco minutos después tenía un split: tres subtareas shippables de forma independiente, dos preguntas para el product owner, y un punto de partida que no requería leer nada más primero. El ticket no era más simple. Sólo sabía por dónde empezar.

El agente no resolvió el problema. Me ayudó a ver su forma.

## La pregunta antes de la pregunta

Esto importa más para juniors que para seniors, pero no como pensarías. Los juniors dejan de perder días en "no sé por dónde empezar" — el impuesto oculto de ser nuevo. Los seniors consiguen otra cosa: permiso para no saber. El framework desconocido, la parte del codebase que no han tocado en dos años, el dominio en el que nunca han trabajado — pueden preguntar sin parecer junior, porque el agente no lleva la cuenta.

Los dos extremos de la curva de seniority obtienen el mismo desbloqueo: la fricción de admitir "esto aún no lo entiendo" se va a cero. No es un boost de productividad. Es un cambio cultural. La razón por la que la mayoría de las tareas complejas se sienten paralizantes no es que sean realmente complejas — es que el coste de empezar de forma tonta es demasiado alto. Cuando ese coste se va a cero, empiezas.

La primera parte decía que lo difícil era definir qué importa. Eso sigue siendo cierto. Pero antes de poder definir qué importa, a menudo tienes que entender qué se está preguntando — e históricamente ese paso tenía un coste social que la mayoría no quería pagar en voz alta. Ahora ya no. Puedes hacer la pregunta tonta todas las veces que haga falta, en cualquier formulación, sin juicio, e iterar hasta que lo entiendas de verdad. Ese paso era antes privado, vergonzoso y lento. Ahora es rápido y no cuesta nada.

La respuesta siempre fue 42. La pregunta siempre fue lo difícil. Lo que ha cambiado es que averiguar la pregunta se ha vuelto más barato.
