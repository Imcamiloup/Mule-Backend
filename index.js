import server from "./src/server.js";
import sequelize from "./src/database/db.js";
const { DB_PORT } = process.env;

sequelize
  .sync({ force: true })
  .then(() => {
    server.listen(DB_PORT, () => {
      console.log("Database connection succesful!");
      console.log(`Server listening on port: http://localhost:${DB_PORT}`);
    });
  })
  .catch((error) => {
    console.error("There was an error:", error);
    console.log("There was a mistake"+`${DB_PORT}`, error.message);
  });

export default sequelize;
