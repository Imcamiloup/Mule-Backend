import { DataTypes } from "sequelize";

export default (sequelize) => {
  sequelize.define(
    "Branch",
    {
      id: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        autoIncrement: true,
      },
      province: {
        type: DataTypes.STRING,
      },

      direction: {
        type: DataTypes.STRING,
      },

      phone: {
        type: DataTypes.BIGINT,
      },
    },
    { timestamps: false }
  );
};
