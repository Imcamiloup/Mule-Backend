import { DataTypes, UUIDV4 } from "sequelize";

export default (sequelize) => {
  sequelize.define(
    "Enlistment",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        unique: true,
      },

      destiny: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      distance: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      delivery_time: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      // order_time: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // },

      // price_order: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      // },

      // qualify_user: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // },

      // qualify_order: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // },

      freigth_description: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      freigth_weigth: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      freigth_measures: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      freigth_type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { timestamps: false }
  );
};
