import { DataTypes } from "sequelize";

export default (sequelize) => {
  sequelize.define(
    "Measure",
    {
      id: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        autoIncrement: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      value: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },

      measures: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { timestamps: false }
  );
};
