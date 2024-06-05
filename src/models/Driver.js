import { DataTypes, UUIDV4 } from "sequelize";

export default (sequelize) => {
  sequelize.define(
    "Driver",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^(?!\s)(?!.*\s$)[A-Za-z\s]{5,35}$/i,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      debit: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [16, 24],
        },
      },
      antiquity: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("disponible", "en asignacion", "en ruta"),
        allowNull: true,
      },
    },
    { timestamps: false }
  );
};
