const path = require("node:path");
const express = require("express");
const { VERSION, MENSAJE } = require("./config");
const suites = require("./data/suites");

const app = express();
const PORT = process.env.PORT || 3000;
const ARRANQUE = new Date();

// Compara ciudades sin distinguir mayúsculas ni tildes ("medellin" = "Medellín").
function normalizar(texto) {
  return String(texto)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim()
    .toLowerCase();
}

app.disable("x-powered-by");

// Página principal: public/index.html
app.use(express.static(path.join(__dirname, "public")));

// GET /api/suites y GET /api/suites?ciudad=Madrid
app.get("/api/suites", (req, res) => {
  const { ciudad } = req.query;
  if (ciudad === undefined) {
    return res.json(suites);
  }
  const buscada = normalizar(ciudad);
  res.json(suites.filter((suite) => normalizar(suite.ciudad) === buscada));
});

// GET /api/suites/:id
app.get("/api/suites/:id", (req, res) => {
  const suite = suites.find((s) => String(s.id) === req.params.id);
  if (!suite) {
    return res.status(404).json({
      error: "Suite no encontrada",
      mensaje: `No existe ninguna suite con id ${req.params.id}. Los ids válidos van del 1 al ${suites.length}.`,
    });
  }
  res.json(suite);
});

// GET /api/estado
app.get("/api/estado", (req, res) => {
  res.set("Cache-Control", "no-store");
  res.json({
    estado: "en línea",
    version: VERSION,
    mensaje: MENSAJE,
    entorno: process.env.NODE_ENV || "desarrollo",
    node: process.version,
    host: req.headers.host,
    arranque: ARRANQUE.toISOString(),
    encendidoSegundos: Math.floor((Date.now() - ARRANQUE.getTime()) / 1000),
  });
});

// Cualquier otra ruta de la API responde 404 en JSON.
app.use("/api", (req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada",
    mensaje: `La ruta ${req.originalUrl} no existe en la API de Lumen Suites.`,
  });
});

app.listen(PORT, () => {
  console.log(`Lumen Suites API v${VERSION} escuchando en el puerto ${PORT}`);
});
