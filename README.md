# Lumen Suites API

API de demostración de **Lumen Suites**, una cadena ficticia de hoteles boutique en Latinoamérica y España. Está hecha con Node.js y Express y sirve para mostrar en video cómo una API pasa de funcionar solo en `localhost` a estar en una URL pública.

Los datos viven en memoria (`data/suites.js`). No hay base de datos ni paso de build.

## Correrla en local

Requiere Node.js 22 o superior.

```bash
npm install
npm start
```

Abre http://localhost:3000. El servidor usa el puerto de `process.env.PORT` y, si no existe, el 3000.

## Endpoints

| Ruta | Qué devuelve |
| --- | --- |
| `GET /` | Página principal (`public/index.html`) |
| `GET /api/suites` | Las 6 suites |
| `GET /api/suites/:id` | Una suite, o 404 en JSON si no existe |
| `GET /api/suites?ciudad=Madrid` | Suites de esa ciudad (no distingue mayúsculas ni tildes) |
| `GET /api/estado` | Estado, versión, mensaje, entorno, versión de Node, host, hora de arranque y segundos encendido |

## Escena del git push

Abre `config.js` y cambia esta línea:

```js
const VERSION = "1.0";
```

por:

```js
const VERSION = "1.1";
```

Después:

```bash
git commit -am "Versión 1.1"
git push
```

Cuando termine el despliegue, la insignia de la página pasa de **v1.0** a **v1.1** sin recargar (la página consulta `/api/estado` cada segundo). Si prefieres cambiar el texto, edita la línea `const MENSAJE = "Reservas abiertas en 6 ciudades";` en el mismo archivo.
