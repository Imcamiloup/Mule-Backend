const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Vehicle",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        unique: true,
      },
      marca: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      modelo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      numero_seguro: {
        type: DataTypes.NUMBER,
        allowNull: true,
      },
      placa: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      estado: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { timestamps: false }
  );
};
