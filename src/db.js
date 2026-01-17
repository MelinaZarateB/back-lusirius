import "dotenv/config";
import { Sequelize } from "sequelize";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;

export const conn = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  {
    logging: false,
    native: false,
  },
);

// Cargar modelos
const basename = path.basename(__filename);
const modelDefiners = [];

const files = fs
  .readdirSync(path.join(__dirname, "models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js",
  );

for (const file of files) {
  const model = await import(path.join(__dirname, "models", file));
  modelDefiners.push(model.default);
}

// Inyectar sequelize
modelDefiners.forEach((model) => model(conn));

// Capitalizar modelos
const entries = Object.entries(conn.models);
const capsEntries = entries.map(([name, model]) => [
  name.charAt(0).toUpperCase() + name.slice(1),
  model,
]);

conn.models = Object.fromEntries(capsEntries);

// Relaciones
const { Users, Services, Appointments } = conn.models;

Users.hasMany(Appointments, { foreignKey: "userId" });
Appointments.belongsTo(Users, { foreignKey: "userId" });

Services.hasMany(Appointments, { foreignKey: "serviceId" });
Appointments.belongsTo(Services, { foreignKey: "serviceId" });

export default conn.models;
