import { DataTypes, UUIDV4 } from "sequelize";

export default (sequelize) => {
  sequelize.define(
    "Measure",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        unique: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      value: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },

      picture: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      // length: {
      //   type: DataTypes.FLOAT,
      //   allowNull: false,
      // },
      // width: {
      //   type: DataTypes.FLOAT,
      //   allowNull: false,
      // },
      // height: {
      //   type: DataTypes.FLOAT,
      //   allowNull: false,
      // },
      // weight: {
      //   type: DataTypes.FLOAT,
      //   allowNull: false,
      // },
      // unit: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // },
      // createdAt: {
      //   type: DataTypes.DATE,
      //   allowNull: false,
      //   defaultValue: () => new Date(),
      // },
      // updatedAt: {
      //   type: DataTypes.DATE,
      //   allowNull: false,
      //   defaultValue: () => new Date(),
      // },
    },
    { timestamps: false }
  );
};
