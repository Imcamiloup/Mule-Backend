import server from "./src/server.js";
import sequelize from "./src/database/db.js";
const { PORT } = process.env;

sequelize
  .sync({ force: true })
  .then(() => {
    server.listen(PORT, () => {
      console.log("Database connection succesful!");
      console.log(`Server listening on port: http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("There was a mistake", error.message);
  });
