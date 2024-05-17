import { DataTypes, UUIDV4 } from "sequelize";

export default (sequelize) => {
  sequelize.define(
    "Branch",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        unique: true,
      },
      province: {
        type: DataTypes.STRING,
        allownull: true,
      },

      city: {
        type: DataTypes.STRING,
        allownull: true,
      },

      zip_code: {
        type: DataTypes.STRING,
        allownull: true,
      },

      direction: {
        type: DataTypes.STRING,
        allownull: true,
      },

      phone: {
        type: DataTypes.STRING,
        allownull: true,
      },

      type: {
        type: DataTypes.STRING,
        allownull: true,
      },
    },
    { timestamps: false }
  );
};
