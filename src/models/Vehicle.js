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
          len: [8, 12],
          is: /^\d+$/,
        },
      },

      plate: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[A-Za-z]{2}-\d{3}-[A-Za-z]{2}$/,
        },
      },

      tecnical_review: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[A-Z0-9]{2,4}-[A-Z]{2}-\d{4}-\d+$/i,
        },
      },

      driving_licence: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          is: /^\d+$/,
          len: [8, 8],
        },
      },

      cargo_manifest: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },

      news: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          is: /^[a-zA-Z0-9\s]+$/,
        },
      },
    },
    { timestamps: false }
  );
};
