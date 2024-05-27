import server from "./src/server.js";
import sequelize from "./src/database/db.js";

import { bulkCreateTypeShipments } from "./src/controllers/typeShipmentsController.js";
import { bulkCreateMeasures } from "./src/controllers/measuresController.js";
import { createDefaultUser } from "./src/database/initial/AdminDefault.js";

const { PORT } = process.env;

sequelize
  .sync()
  .then(() => {
    server.listen(PORT, () => {
      console.log("Database connection succesful!");
      console.log(`Server listening on port: http://localhost:${PORT}`);
      bulkCreateTypeShipments();
      bulkCreateMeasures();
      createDefaultUser();
    });
  })
  .catch((error) => {
    console.error("There was an error:", error);
  });

export default sequelize;
