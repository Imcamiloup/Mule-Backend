import { DataTypes, UUIDV4 } from "sequelize";

export default (sequelize) => {
  sequelize.define(
    "Vehicle",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        unique: true,
      },

      model: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          is: /^[A-HJ-NPR-Z0-9]{17}$/i,
        },
      },

      state: {
        type: DataTypes.ENUM("active", "inactive", "maintenance", "discharged"),
        allowNull: true,
      },

      car_insurance: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          len: [7, 10],
        },
      },

      plate: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [3, 7],
        },
      },

      fee: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
          min: 1,
          max: 10,
        },
      },

      antiquity: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { timestamps: false }
  );
};
