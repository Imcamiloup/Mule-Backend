import {
  // getOrCreateMeasuresController,
  bulkCreateMeasures,
  getMeasureByIdController,
} from "../controllers/measuresController.js";

import { Measure } from "../database/db.js";

bulkCreateMeasures();

const getOrCreateMeasuresHandler = async (req, res) => {
  try {
    // const measures = await getOrCreateMeasuresController();

    const measures = await Measure.findAll();

    res.status(200).send(measures);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getMeasureByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const measureById = await getMeasureByIdController(id);
    res.status(200).send(measureById);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

export { getOrCreateMeasuresHandler, getMeasureByIdHandler };
