import { Sequelize } from "sequelize";

const { DB_USER, DB_PASSWORD, DB_HOST, DATABASE_NAME } = process.env;

import UserModel from "../models/User.js";
import AdminModel from "../models/Admin.js";
import ClientModel from "../models/Client.js";
import DriverModel from "../models/Driver.js";
import FreigthModel from "../models/Freigth.js";
import VehicleModel from "../models/Vehicle.js";
import EnlistmentModel from "../models/Enlistment.js";
import OrderShipmentModel from "../models/OrderShipment.js";
import TypeShipmentModel from "../models/TypeShipment.js";

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DATABASE_NAME}`,
  { logging: false }
);

UserModel(sequelize);
AdminModel(sequelize);
ClientModel(sequelize);
DriverModel(sequelize);
FreigthModel(sequelize);
VehicleModel(sequelize);
EnlistmentModel(sequelize);
OrderShipmentModel(sequelize);
TypeShipmentModel(sequelize);

const { User, Admin, Client, Driver, Freigth, Vehicle, Enlistment ,OrderShipment, TypeShipment  } =
  sequelize.models;

  
Client.belongsToMany(Enlistment, { through: "enlistment_client" });
Enlistment.belongsToMany(Client, { through: "enlistment_client" });

Driver.belongsToMany(Enlistment, { through: "enlistment_driver" });
Enlistment.belongsToMany(Driver, { through: "enlistment_driver" });

Vehicle.belongsToMany(Enlistment, { through: "enlistment_vehicle" });
Enlistment.belongsToMany(Vehicle, { through: "enlistment_vehicle" });


TypeShipment.hasMany(OrderShipment, { as: "typeShipment" , foreignKey: "typeShipmentId" });
OrderShipment.belongsTo(TypeShipment);

// Freigth.belongsToMany(Enlistment, { through: "enlistment_freigth" });
// Enlistment.belongsToMany(Freigth, { through: "enlistment_freigth" });

export {
  User,
  Admin,
  Client,
  Driver,
  //  Freigth,
  Vehicle,
  Enlistment,
  OrderShipment,
  TypeShipment,
};

export default sequelize;
