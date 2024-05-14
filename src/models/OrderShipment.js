<<<<<<< HEAD
import { DataTypes , UUIDV4} from "sequelize";

export default (sequelize) => {
    sequelize.define(
        "OrderShipment",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: UUIDV4,
                primaryKey: true,
              },
            name_claimant: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            cedula_claimant: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            cellphone_claimant: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            name_transmiter: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            celphone_transmiter: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            city_transmiter: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            address_transmiter: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            name_receiver: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            celphone_receiver: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            city_receiver: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            address_receiver: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            weight: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            declared_value: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            product_image: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            pay_method: {
                type: DataTypes.STRING,
                allowNull: true,
            },         
=======
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
          is: /^[a-zA-Z0-9\s,.]+$/,
          len: [3, 30],
>>>>>>> 86ef8a337f816a0e8a2e44275e33f8dc4965d31d
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
          is: /^[a-zA-Z0-9\s,.]+$/,
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
          is: /^[a-zA-Z0-9\s,.]+$/,
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
          is: /^[a-zA-Z0-9\s,.]+$/,
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
          is: /^[a-zA-Z0-9\s,.]+$/,
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
          len: [1, 3],
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
        type: DataTypes.ENUM("cash", "credit-card", "debit"),
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
