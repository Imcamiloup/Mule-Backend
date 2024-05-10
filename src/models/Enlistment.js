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

      guide_number: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
      },

      state: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      distance: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      delivery_time: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      order_time: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      price_order: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      qualify_user: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      qualify: {
        type: DataTypes.ENUM("1", "2", "3", "4", "5"),
      },

      comment: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { timestamps: false }
  );
};
