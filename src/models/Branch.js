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
        validate: {
          len: [3, 30],
          is: /^[a-zA-Z\s]+$/,
        },
      },

      city: {
        type: DataTypes.STRING,
        allownull: true,
        validate: {
          len: [3, 20],
          is: /^[a-zA-Z\s]+$/,
        },
      },

      direction: {
        type: DataTypes.STRING,
        allownull: true,
        validate: {
          is: /^[a-zA-Z0-9,.\-#\s]+$/,
          len: [3, 25],
        },
      },

      phone: {
        type: DataTypes.INTEGER,
        allownull: true,
        validate: {
          is: /^\d+$/,
          len: [10, 10],
        },
      },
    },
    { timestamps: false }
  );
};
