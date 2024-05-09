import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from 'uuid'; // Importar v4 como uuidv4

export default (sequelize) => {
  sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => uuidv4(),
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      Password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Cedula: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      Cel_Phone_Number: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Fee_Category_Percentage: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      Category: {
        type: DataTypes.ENUM('regular', 'pro'),
        defaultValue: 'regular',
        allowNull: false
      },
      Age: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      Role: {
        type: DataTypes.ENUM('admin', 'user', 'asesor'),
        allowNull: false
      },
      IsActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
      }
    },
    { timestamps: false }
  );
};
