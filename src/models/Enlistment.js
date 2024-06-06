import { DataTypes, UUIDV4, Sequelize } from "sequelize";

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
        validate: {
          is: /^\d+$/,
          len: [10],
        },
      },

      state: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Pending",
        validate: {
          is: /^[a-zA-Z0-9\s]+$/,
        },
      },

      distance: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          is: /^\d+$/,
        },
      },

      delivery_time: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[a-zA-Z0-9\s]+$/,
        },
      },

      // YYYY-MM-DD HH:MM:SS
      order_time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },

      price_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          is: /^\d+$/,
        },
      },
    },
    { timestamps: false }
  );
};
