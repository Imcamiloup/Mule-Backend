import { Sequelize } from "sequelize";

const { DB_USER, DB_PASSWORD, DB_HOST, DATABASE_NAME } = process.env;

import UserModel from "../models/User.js";
import AdminModel from "../models/Admin.js";
import DriverModel from "../models/Driver.js";
import VehicleModel from "../models/Vehicle.js";
import EnlistmentModel from "../models/Enlistment.js";
import OdershipmentModel from "../models/OrderShipment.js";

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DATABASE_NAME}`,
  { logging: false }
);

UserModel(sequelize);
AdminModel(sequelize);
DriverModel(sequelize);
VehicleModel(sequelize);
OdershipmentModel(sequelize);
EnlistmentModel(sequelize);

const { User, Admin, Driver, OrderShipment, Vehicle, Enlistment } =
  sequelize.models;

Vehicle.hasOne(Driver, { foreignKey: "vehicle_id" });
Driver.belongsTo(Vehicle, { foreignKey: "vehicle_id" });

Driver.belongsToMany(Enlistment, { through: "enlistment_driver" });
Enlistment.belongsToMany(Driver, { through: "enlistment_driver" });

export { User, Admin, Driver, OrderShipment, Vehicle, Enlistment };

export default sequelize;
