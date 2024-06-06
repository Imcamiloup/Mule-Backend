import server from "./src/server.js";
import sequelize from "./src/database/db.js";

import { bulkCreateTypeShipments } from "./src/controllers/typeShipmentsController.js";
import { bulkCreateMeasures } from "./src/controllers/measuresController.js";
import { createDefaultUser } from "./src/database/initial/AdminDefault.js";
import { bulkCreateBranches } from "./src/controllers/branchesController.js";
import { bulkCreateVehicles } from "./src/controllers/vehiclesController.js";
import { bulkCreateDrivers } from "./src/controllers/driversController.js";

const { PORT } = process.env;

sequelize
  .sync()
  .then(() => {
    server.listen(PORT, () => {
      console.log("Database connection succesful!");
      console.log(`Server listening on port: ${PORT}`);
      bulkCreateTypeShipments();
      bulkCreateMeasures();
      createDefaultUser();
      bulkCreateBranches();
      bulkCreateVehicles();
      bulkCreateDrivers();
    });
  })
  .catch((error) => {
    console.error("There was an error:", error);
  });

export default sequelize;
