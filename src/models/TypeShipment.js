import { DataTypes } from "sequelize";

export default (sequelize) => {
  sequelize.define(
    "TypeShipment",
    {
      id: {
        // type: DataTypes.UUID,
        // defaultValue: UUIDV4,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    },
    { timestamps: false }
  );
};

