import { DataTypes, UUIDV4 } from "sequelize";


export default (sequelize) => {
  sequelize.define(
    "User",
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
        validate: {
          is: /^[a-zA-ZÀ-ÿ\s]+$/u,
        }
      },
      
      nickname: {
        type: DataTypes.STRING,
        allowNull: true,
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
        allowNull: true,
        unique: true,
        validate: {
          isNumeric: true,
          len: [8, 11],
        },
      },
      cel_Phone_Number: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isNumeric: true,
          len: [10, 11],
        },
      },
      fee_Category_Percentage: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
          min: 0,
          max: 100,
        },
        allowNull: true,
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
        type: DataTypes.STRING,
        allowNull: true,       
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
      photo: {
        type: DataTypes.STRING, 
        allowNull: true,
        validate: {
          isUrl: {
            msg: "La foto debe ser una URL válida"
          },
        },
      },
    },
    { timestamps: false }
  );
};
