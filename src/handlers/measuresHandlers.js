import { Measure } from "../database/db.js";
import {
  createMeasureController,
  getAllMeasuresController,
  getMeasureByIdController,
  updateMeasureController,
  deleteMeasureController,
} from "../controllers/measuresController.js";
import FilteredAndOrderedData from "../utils/helpers/filteredAndOrderedData.js";

const getAllMeasuresHandler = async (req, res) => {
  const { name, orderBy, orderDirection } = req.query;

  try {
    let measures;
    if (name || orderBy || orderDirection) {
      measures = await FilteredAndOrderedData(Measure, { name }, orderBy, orderDirection);
    } else {
      measures = await getAllMeasuresController();
    }
    res.status(200).send(measures);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getMeasureByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const measureById = await getMeasureByIdController(id);
    res.status(200).send(measureById);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const postMeasureHandler = async (req, res) => {
  try {
    const { name, value, unit } = req.body;

    if (!name || !value || !unit) {
      throw new Error("Missing data");
    }

    const newMeasure = await createMeasureController({
      name,
      value,
      unit,
    });

    res.status(200).send(newMeasure);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const updateMeasureHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, value, unit } = req.body;
    const measureModified = await updateMeasureController(id, {
      name,
      value,
      unit,
    });
    res.status(200).send(measureModified);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const deleteMeasureHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteMeasureController(id);
    res.status(200).send({ message: "Measure deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export {
  getAllMeasuresHandler,
  getMeasureByIdHandler,
  postMeasureHandler,
  updateMeasureHandler,
  deleteMeasureHandler,
};
