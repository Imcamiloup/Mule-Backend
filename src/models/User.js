import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid"; // Importar v4 como uuidv4

export default (sequelize) => {
  sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        unique: true,
        defaultValue: () => uuidv4(),
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      emailVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 8,
          isStrongPassword(value) {
            if (
              !/(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(
                value
              )
            ) {
              throw new Error(
                "La contraseña debe contener al menos una letra, un número y un carácter especial."
              );
            }
          },
        },
      },
      cedula: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isNumeric: true,
          len: [10, 11],
        },
      },
      cel_Phone_Number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isNumeric: true,
          len: [10, 11],
        },
      },
      fee_Category_Percentage: {
        type: DataTypes.INTEGER,
        validate: {
          min: 0,
          max: 100,
        },
        allowNull: false,
      },
      category: {
        type: DataTypes.ENUM("regular", "pro"),
        defaultValue: "regular",
        allowNull: false,
        validate: {
          isIn: [["regular", "pro"]],
        },
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 18,
          max: 100,
        },
      },
      role: {
        type: DataTypes.ENUM("admin", "user", "asesor"),
        defaultValue: "user",
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: "true",
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
