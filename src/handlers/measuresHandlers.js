import {
  getOrCreateMeasuresController,
  getMeasureByIdController,
} from "../controllers/measuresController.js";

const getOrCreateMeasuresHandler = async (req, res) => {
  try {
    const measures = await getOrCreateMeasuresController();

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
