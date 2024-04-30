const server = require("./src/server");
const sequelize = require("./src/database/db");
const { PORT } = process.env;

sequelize
  .sync({ force: true })
  .then(() => {
    server.listen(PORT, () => {
      console.log("Conexion con la base de datos exitosa!");
      console.log(`Servidor escuchando en el puerto: http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Hubo un error", error);
  });
