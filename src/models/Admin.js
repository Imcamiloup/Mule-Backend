const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Admin', {
    id: {
      // type: DataTypes.UUID,
      // defaultValue: UUIDV4,
      type:DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey: true,
      unique: true,
    }
  },
  { timestamps: false });
};


