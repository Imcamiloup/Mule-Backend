import { Sequelize } from "sequelize";

const { DB_USER, DB_PASSWORD, DB_HOST, DATABASE_NAME } = process.env;

import UserModel from "../models/User.js";
import AdminModel from "../models/Admin.js";
import DriverModel from "../models/Driver.js";
import VehicleModel from "../models/Vehicle.js";
import EnlistmentModel from "../models/Enlistment.js";
import OrderShipmentModel from "../models/OrderShipment.js";
import TypeShipmentModel from "../models/TypeShipment.js";
import MeasureModel from "../models/Measure.js";
import BranchModel from "../models/Branch.js";

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DATABASE_NAME}`,
  { logging: false }
);

UserModel(sequelize);
AdminModel(sequelize);
DriverModel(sequelize);
VehicleModel(sequelize);
EnlistmentModel(sequelize);
OrderShipmentModel(sequelize);
TypeShipmentModel(sequelize);
MeasureModel(sequelize);
BranchModel(sequelize);

const {
  User,
  Admin,
  Driver,
  Vehicle,
  Enlistment,
  OrderShipment,
  TypeShipment,
  Measure,
  Branch,
} = sequelize.models;

User.hasMany(OrderShipment, { foreignKey: "user_id" });
OrderShipment.belongsTo(User, { foreignKey: "user_id" });

Vehicle.hasOne(Driver, { foreignKey: "vehicle_id" });
Driver.belongsTo(Vehicle, { foreignKey: "vehicle_id" });

Driver.belongsToMany(Enlistment, { through: "enlistment_driver" });
Enlistment.belongsToMany(Driver, { through: "enlistment_driver" });

TypeShipment.hasMany(OrderShipment, {
  as: "typeShipment",
  foreignKey: "typeShipmentId",
});
OrderShipment.belongsTo(TypeShipment, { foreignKey: "typeShipmentId" });

Measure.hasMany(OrderShipment, { foreignKey: "measureId" });
OrderShipment.belongsTo(Measure, { foreignKey: "measureId" });

OrderShipment.hasOne(Enlistment, { foreignKey: "ordershipment_id" });
Enlistment.belongsTo(OrderShipment, { foreignKey: "ordershipment_id" });

Branch.hasMany(OrderShipment, { foreignKey: "branch_id" });
OrderShipment.belongsTo(Branch, { foreignKey: "branch_id" });

export {
  User,
  Admin,
  Driver,
  Vehicle,
  Enlistment,
  OrderShipment,
  TypeShipment,
  Measure,
  Branch,
};

export default sequelize;
