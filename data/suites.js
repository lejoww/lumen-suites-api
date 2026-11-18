// Datos en memoria. Se reinician cada vez que arranca el servidor.
const suites = [
  { id: 1, nombre: "Suite Alameda", ciudad: "Ciudad de México", precioNoche: 240, capacidad: 2, disponible: true },
  { id: 2, nombre: "Suite Las Palmas", ciudad: "Medellín", precioNoche: 180, capacidad: 2, disponible: true },
  { id: 3, nombre: "Suite Recoleta", ciudad: "Buenos Aires", precioNoche: 210, capacidad: 3, disponible: false },
  { id: 4, nombre: "Suite Gran Vía", ciudad: "Madrid", precioNoche: 320, capacidad: 2, disponible: true },
  { id: 5, nombre: "Suite Murallas", ciudad: "Cartagena", precioNoche: 260, capacidad: 4, disponible: true },
  { id: 6, nombre: "Suite Barranco", ciudad: "Lima", precioNoche: 195, capacidad: 2, disponible: true },
];

module.exports = suites;
