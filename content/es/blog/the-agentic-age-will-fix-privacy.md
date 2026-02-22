---
title: La era agéntica arreglará la privacidad
date: 2026-02-22
description: Las VPNs transfieren confianza de tu ISP a una empresa VPN. Los agentes de IA eliminan la necesidad de confiar — la web nunca te ve.
contactHeading: "¿Quieres construir integraciones de agentes con privacidad?"
---

Las VPNs iban a resolver la privacidad online. Enrutas tu tráfico a través de un servidor VPN, tu ISP no ve lo que haces, y la web de destino ve la IP de la VPN en vez de la tuya. Ese es el pitch. La realidad es más desordenada, y está emergiendo un modelo diferente que hace obsoleto todo el enfoque.

## El problema de confianza de las VPNs

Una VPN no elimina la vigilancia. La desplaza. En vez de que tu ISP vea tu tráfico, lo ve el proveedor VPN. Como lo dice [Privacy Guides](https://www.privacyguides.org/en/basics/vpn-overview/): "VPN providers can also see and modify your traffic the same way your ISP could, so there is still a level of trust you are placing in them."

Esa confianza se ha roto repetidamente.

En 2017, [PureVPN](https://torrentfreak.com/purevpn-explains-how-it-helped-the-fbi-catch-a-cyberstalker-171016/) — un proveedor que publicitaba una "zero log policy" — entregó registros de conexión al FBI que identificaron directamente a un usuario. Los logs mostraban qué direcciones IP accedieron a una sesión VPN específica, cuándo y qué cuentas se usaron. En 2016, [IPVanish](https://torrentfreak.com/ipvanish-no-logging-vpn-led-homeland-security-to-comcast-user-180505/) primero dijo al Department of Homeland Security que no tenían logs, luego respondió a una segunda citación con timestamps de conexión detallados e IPs de origen. [HideMyAss](https://www.theregister.com/2011/09/26/hidemyass_lulzsec_controversy/) entregó un usuario al FBI tras una orden judicial en 2011.

No son casos aislados. No existe [ningún estándar de la industria](https://cyberinsider.com/vpn-logs-lies/) que defina qué significa "no logs." Cada proveedor lo define diferente, y no hay forma de verificar la afirmación desde fuera.

## El problema de propiedad

El mercado VPN se ha consolidado de formas que deberían incomodar a los usuarios conscientes de la privacidad. [Kape Technologies](https://cyberinsider.com/kape-technologies-owns-expressvpn-cyberghost-pia-zenmate-vpn-review-sites/) — antes Crossrider, una empresa cuya plataforma se usó ampliamente para distribuir adware — ahora es dueña de ExpressVPN, CyberGhost, Private Internet Access y ZenMate. Cuatro de los servicios VPN más populares bajo una empresa con historial de adware. Kape también adquirió [vpnMentor y Wizcase](https://www.theregister.com/2021/09/14/expressvpn_bought_kape/) — dos sitios grandes de reseñas VPN que ahora posicionan los productos de Kape en su top tres.

Las VPNs gratuitas son peores. Un [estudio de CSIRO](https://research.csiro.au/isp/wp-content/uploads/sites/106/2016/08/paper-1.pdf) que examinó 283 apps VPN de Android encontró que el 38% contenía malware, el 75% usaba librerías de tracking de terceros y el 18% no cifraba el tráfico en absoluto. [SuperVPN](https://www.abijita.com/supervpn-data-breach-exposed-360-million-records-online/) filtró 360 millones de registros de usuarios en 2023. [Onavo Protect](https://www.bitdefender.com/en-us/blog/hotforsecurity/facebook-pulls-its-vpn-from-the-ios-app-store-after-data-harvesting-accusations) de Facebook se comercializó como herramienta de privacidad mientras canalizaba todo el tráfico de usuarios a través de los servidores de Facebook para analytics.

## Las VPNs no resuelven el fingerprinting

Aunque confíes completamente en tu proveedor VPN, sigues siendo rastreable. Las VPNs cambian tu dirección IP. Nada más. No hacen nada contra el browser fingerprinting, y el fingerprinting es cómo funciona realmente el tracking moderno.

El [estudio Panopticlick de la EFF](https://coveryourtracks.eff.org/static/browser-uniqueness.pdf) encontró que el 83,6% de los navegadores tienen un fingerprint único basado en su renderizado Canvas, salida WebGL, fuentes instaladas, resolución de pantalla, zona horaria, idioma y docenas de otras señales. Con Flash o Java, esa cifra llegó al 94,2%. Cada navegador lleva aproximadamente 18 bits de entropía identificadora — suficiente para distinguirte entre cientos de miles de usuarios.

El [fingerprinting WebGL](https://roundproxies.com/blog/webgl-fingerprinting/) es particularmente difícil de evadir porque opera a nivel de hardware, extrayendo características de renderizado de la GPU a través de JavaScript. Una VPN no tiene efecto sobre esto. El modo incógnito tampoco.

Según el [Web Almanac 2025](https://almanac.httparchive.org/en/2025/privacy), el 75% de las webs de escritorio contienen al menos un tracker de terceros, y los trackers de Google están presentes en el 61% de todas las páginas web. En febrero de 2025, Google [revirtió oficialmente su política](https://www.malwarebytes.com/blog/news/2025/02/google-now-allows-digital-fingerprinting-of-its-users) contra el tracking basado en fingerprinting, permitiendo a los anunciantes usarlo. La [Information Commissioner's Office](https://ico.org.uk/about-the-ico/media-centre/news-and-blogs/2024/12/our-response-to-google-s-policy-change-on-fingerprinting/) del Reino Unido calificó la medida de "irresponsable."

El estado actual es: las VPNs ocultan tu IP pero no tu identidad, el proveedor VPN se convierte en un nuevo punto de vigilancia que no puedes verificar, las mayores marcas VPN pertenecen a una ex empresa de adware, y la industria del tracking acaba de recibir luz verde para rastrearte por fingerprint.

## Los agentes cambian el modelo

Cuando un agente de IA navega la web en tu nombre, la web nunca ve tu navegador. Nunca ve tu dirección IP, tu canvas fingerprint, tu salida WebGL, tus fuentes instaladas, tu zona horaria. Ve la infraestructura del agente — un servidor de [OpenAI](https://openai.com/index/introducing-chatgpt-agent/) o [Anthropic](https://www.anthropic.com) en algún lugar, con un fingerprint genérico compartido por millones de peticiones.

Esto no es un feature de privacidad diseñado intencionalmente. Es un efecto secundario arquitectónico. El agente ejecuta su propio entorno de navegador en el servidor. Cuando [ChatGPT agent](https://help.openai.com/en/articles/11752874-chatgpt-agent) visita una web para investigar algo para ti, usa su propia computadora virtual. [Perplexity](https://www.perplexity.ai/hub/blog/agents-or-bots-making-sense-of-ai-on-the-open-web) describe sus peticiones como "targeted, one-off requests to retrieve current information" — la web ve la infraestructura de Perplexity, no a ti.

El tracking cross-site vía fingerprinting pierde sentido cuando el fingerprint pertenece a un agente compartido por millones de usuarios. No hay individuo que rastrear.

## De sesiones de navegador a queries estructurados

[MCP (Model Context Protocol)](https://modelcontextprotocol.io) lleva esto más lejos. En vez de que un agente navegue una web como lo haría un humano — cargando páginas, parseando HTML, haciendo clic en botones — MCP permite a los agentes interactuar con servicios a través de tool calls estructurados. El agente pide datos específicos a través de una API. El servicio responde con datos estructurados. Sin sesión de navegador, sin cookies, sin superficie de fingerprint.

Pasa de "un usuario navega una web" a "un agente consulta un servicio." Tu identidad no está oculta detrás de un proxy. Está ausente de la interacción por completo. El servicio autentica la petición del agente mediante [tokens OAuth](https://modelcontextprotocol.io/specification/2025-11-25), no cookies de navegador vinculadas a tu dispositivo.

## La nueva ecuación de confianza

Esto no sale gratis. El browsing agéntico crea su propio problema de confianza: tú y tu proveedor de IA. OpenAI, Anthropic, Google, quien ejecute el agente, ahora está entre tú y la web. Saben qué pediste, aunque la web de destino no sepa quién lo pidió.

Y los riesgos son concretos. [TechCrunch](https://techcrunch.com/2025/10/25/the-glaring-security-risks-with-ai-browser-agents/) señaló que los agentes requieren "the ability to view and take action in a user's email, calendar, and contact list." El [Future of Privacy Forum](https://fpf.org/blog/minding-mindful-machines-ai-agents-and-data-protection-considerations/) advirtió que los agentes recopilan "granular telemetry — user interactions, action logs, performance metrics" que pueden calificar como datos personales. Investigadores ya encontraron [30 vulnerabilidades](https://arxiv.org/abs/2512.07725) en 8 agentes de navegador populares, incluyendo features de privacidad desactivados y agentes que autocompletaron información personal sensible.

Pero la comparación que importa es: ¿qué estás reemplazando? Hoy, cada web que visitas ve tu IP, tu fingerprint, tus cookies. Tu ISP ve cada dominio al que te conectas. Si usas VPN, el proveedor VPN ve todo lo que habría visto el ISP. El browser fingerprinting te rastrea entre sitios consientas o no, y el 75% de las webs ejecutan trackers.

Con browsing agéntico, una entidad — el proveedor de IA — ve tu intención. El resto de la web no ve nada sobre ti. No es privacidad perfecta. Pero reduce la superficie de ataque comparada con lo que tenemos ahora, donde tu identidad se filtra a cada sitio, tracker e intermediario en la cadena.

## Hacia dónde va esto

El modelo VPN siempre fue un parche. Tomaste un sistema con fugas — tu navegador transmitiendo tu identidad a cada servidor al que se conecta — y pusiste un proxy delante. El proxy introdujo sus propios problemas de confianza, y no abordó el fingerprinting en absoluto.

El modelo agéntico no parchea el sistema. Reemplaza la interacción. El usuario se queda en casa. El agente sale. Las webs, trackers y scripts de fingerprinting no tienen usuario que identificar porque ningún usuario apareció.

Aún no estamos ahí. La mayoría de la navegación sigue siendo directa. Los agentes manejan investigación, comparaciones, tareas específicas, no el browsing casual. A medida que absorban más de lo que actualmente ocurre a través de navegadores, la superficie disponible para trackers se reduce. No porque hayamos construido mejores escudos, sino porque dejamos de aparecer.
