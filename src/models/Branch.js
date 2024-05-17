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

      zip_code: {
        type: DataTypes.STRING,
        allownull: true,
        validate: {
          is: /^[A-Z]?\d{4}[A-Z]{0,3}$/i,
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

      type: {
        type: DataTypes.STRING,
        allownull: true,
        validate: {
          len: [2, 15],
          is: /^[a-zA-Z\s]+$/,
        },
      },
    },
    { timestamps: false }
  );
};
