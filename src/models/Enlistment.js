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
        allowNull: false,
        validate: {
          is: /^[a-zA-Z0-9\s]+$/,
        },
      },

      distance: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[a-zA-Z0-9\s]+$/,
        },
      },

      delivery_time: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[a-zA-Z0-9\s]+$/,
        },
      },

      order_time: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[a-zA-Z0-9\s]+$/,
        },
      },

      price_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          is: /^\d+$/,
        },
      },

      qualify_user: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[a-zA-Z0-9\s]+$/,
        },
      },

      qualify: {
        type: DataTypes.ENUM("1", "2", "3", "4", "5"),
        allowNullL: false,
        validate: {
          is: /^\d+$/,
        },
      },

      comment: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[a-zA-Z0-9\s]+$/,
        },
      },
    },
    { timestamps: false }
  );
};
