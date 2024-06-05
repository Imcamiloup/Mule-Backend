import { DataTypes, UUIDV4, fn } from "sequelize";

export default (sequelize) => {
  sequelize.define(
    "OrderShipment",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        unique: true,
      },

      name_claimant: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[a-zA-Z\s]+$/,
          len: [3, 30],
        },
      },

      cedula_claimant: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          is: /^\d+$/,
          len: [8, 8],
        },
      },

      cellphone_claimant: {
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
          is: /^\d+$/,
          len: [10, 10],
        },
      },

      name_transmiter: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[a-zA-Z\s]+$/,
          len: [3, 30],
        },
      },

      surname_transmiter: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[a-zA-Z\s]+$/,
          len: [3, 30],
        },
      },

      celphone_transmiter: {
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
          is: /^\d+$/,
          len: [10, 10],
        },
      },

      city_transmiter: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 20],
          is: /^[a-zA-Z\s]+$/,
        },
      },

      address_transmiter: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [5, 35],
          is: /^[a-zA-Z0-9,.\-#\s]+$/,
        },
      },

      name_receiver: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[a-zA-Z\s]+$/,
          len: [3, 30],
        },
      },

      celphone_receiver: {
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
          is: /^\d+$/,
          len: [10, 10],
        },
      },

      city_receiver: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 20],
          is: /^[a-zA-Z\s]+$/,
        },
      },

      address_receiver: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [5, 35],
          is: /^[a-zA-Z0-9,.\-#\s]+$/,
        },
      },

      weight: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        validate: {
          is: /^\d+$/,
        },
      },

      declared_value: {
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
          is: /^\d+$/,
        },
      },

      product_image: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      pay_method: {
        type: DataTypes.ENUM("Efectivo", "Credito", "Debito"),
        allowNull: false,
      },

      created_at: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: fn("now"),
      },
    },
    { timestamps: false }
  );
};
