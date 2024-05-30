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
          len: [10]
        }
      },

      //const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
      state: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "Pending",
        validate: {
          is: /^[a-zA-Z0-9\s]+$/,
        },
      },

      distance: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          is: /^\d+$/,
        },
      },

      delivery_time: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          is: /^\d+$/,
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
