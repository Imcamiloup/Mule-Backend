import { Sequelize } from "sequelize";

const { DB_USER, DB_PASSWORD, DB_HOST, DATABASE_NAME } = process.env;

import AdminModel from "../models/Admin.js";
import ClientModel from "../models/Client.js";
import DriverModel from "../models/Driver.js";
import FreigthModel from "../models/Freigth.js";
import VehicleModel from "../models/Vehicle.js";

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DATABASE_NAME}`,
  { logging: false }
);

AdminModel(sequelize);
ClientModel(sequelize);
DriverModel(sequelize);
FreigthModel(sequelize);
VehicleModel(sequelize);

const { Admin, Client, Driver, Freigth, Vehicle } = sequelize.models;

//relacion de los modelos: (One-to-One, One-to-Many, Many-to-Many)





export default sequelize;
