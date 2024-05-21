import { DataTypes , UUIDV4 } from "sequelize";

export default (sequelize) => {
  sequelize.define(
    "TypeShipment",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
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

