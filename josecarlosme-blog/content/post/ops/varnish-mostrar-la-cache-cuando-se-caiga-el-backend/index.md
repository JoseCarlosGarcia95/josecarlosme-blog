+++
author = "José Carlos García"
date = 2020-10-10T16:01:50Z
description = ""
draft = false
image = "covevr.jpeg"
slug = "varnish-mostrar-la-cache-cuando-se-caiga-el-backend"
title = "Varnish: ¿Cómo mantengo un sitio siempre online y evitos peticiones extras al backend?"
categories = ["ops"]
tags = ["ops", "performance", "varnish"]

+++


# ¿Qué es Varnish?
Varnish es un sistema de cache que se utiliza principalmente para cubrir las siguientes necesidades:

1. **Cachear nuestros sitios webs para reducir la carga del backend.**
2. **Acelerar la carga de estáticos para cargarlo directamente en la RAM.**
3. ...

Varnish tiene una documentación bastante completa que es pública para todo el mundo y podemos consultar directamente en:
- https://varnish-cache.org/docs/6.5/

Una de las configuraciones más interesantes de Varnish **nos permite configurar cuanto tiempo debe de estar un objeto en la cache.**

## Configuración en varnish de tiempos de cache
En la [documentación de varnish](https://varnish-cache.org/docs/trunk/users-guide/vcl-built-in-subs.html#beresp-ttl-beresp-grace-beresp-keep) podemos encontrar como configurar los tiempos que se mantendrá un objeto en la cache.

En este caso, nos vamos a centrar en *beresp.ttl* y *beresp.grace*

### beresp.ttl
Esta configuración **nos permite configurar cuanto tiempo debe de estar un objeto en la cache**. Cuando pase este tiempo, el objeto dejará de servirse desde la cache (Si no tenemos configurado *beresp.grace*). Por ejemplo, si configuramos *set beresp.ttl=1h*, cuando pase una hora, el fichero se volverá a pedir al backend.

### beresp.grace
Esta configuración nos permite configurar un periodo de gracia que **nos permitirá seguir mostrando a los usuarios versiones caducadas de la cache, mientras que varnish consulta al backend por una versión actualizada.**

## Ventajas de usar beresp.grace
Una vez introducidas estas dos configuraciones, se van a mostrar dos ejemplos para que el lector entienda la necesidad del uso de *beresp.grace*.

Supongamos que tenemos un fichero HTML fichero.html con un TTL de 1h y beresp.grace de 24h.

### Ejemplo 1: Mucho tráfico
1. Supongamos que fichero.html **no se encuentra en la cache actualmente**, y que un cliente accede a misitio.com/fichero.html, en este caso,** Varnish irá al backend y pedirá la versión más nueva de fichero.html**, y **la guardará en cache.**
2. Si **otro cliente accede en la próxima hora** a misitio.com/fichero.html, **recibirá la versión de fichero.html que tiene varnish guardada en la cache.**
3. Supongamos que cuando caduca el fichero de la cache, **entran 100 usuarios simultaneos en nuestro sitio web**. Si no tenemos configurado el beresp.grace, a nuestro backend llegarían 100 peticiones, ya que la cache ha caducado. Sin embargo, si tenemos configurado el beresp.grace** los 100 clientes recibirán la versión que esta en cache de fichero.html**, y **seguidamente irá al backend y tratará de encontrar una versión actualizada de fichero.html**, pero en este caso, **sólo se hará una petición al backend**, ya que al estar dentro del período de gracia. **Cuando el backend responda a Varnish, Varnish guardará esta respuesta como la cache más nueva.**
4. Finalmente, cuando acceda un usuario nuevo, **Varnish mandará el nuevo fichero.html que ha guardado en la cache.**

### Ejemplo 2: Sitio online 24/7
1. Supongamos que fichero.html **no se encuentra en la cache actualmente**, y que un cliente accede a misitio.com/fichero.html, en este caso,** Varnish irá al backend y pedirá la versión más nueva de fichero.html**, y **la guardará en cache.**
2. **Supongamos que después de que se haya cargado en cache, se cae nuestro backend.**
3. Debido a que **tenemos configurado un periodo de gracia de 24h**, Varnish **mostrará la versión que tiene en cache durante 24h**, y **tratará de actualizar** la cache en segundo plano, **cuando el sitio esté disponible**. **Los usuarios podrán seguir viendo la web online, ya que Varnish está sirviendola.**
4. Supongamos que **el backend vuelve a estar activo a las 12h**, Varnish se conectará al backend, y **automáticamente refrescará la cache con las versión actualizada de fichero.html**


