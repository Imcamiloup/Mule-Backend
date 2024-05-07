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
        allowNull: false,
        validate: {
          is: /^[A-HJ-NPR-Z0-9]{17}$/i,
        },
      },

      state: {
        type: DataTypes.ENUM("active", "inactive", "maintenance"),
        allowNull: false,
      },

      car_insurance: {
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
          len: [7, 10],
        },
      },

      plate: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [5, 8],
        },
      },
      brand: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
