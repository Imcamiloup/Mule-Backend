import { Measure } from "../database/db.js";

const getAllMeasuresController = async () => {
  try {
    const measures = await Measure.findAll();
    return measures;
  } catch (error) {
    throw new Error("Error getting measures: " + error.message);
  }
};

const getMeasureByIdController = async (id) => {
  try {
    const measure = await Measure.findByPk(id);
    return measure;
  } catch (error) {
    throw new Error("Error getting measure: " + error.message);
  }
};

const createMeasureController = async ({
  name,
  value,
  unit,
}) => {
  return await Measure.create({
    name: name,
    value: value,
    unit: unit,
  });
};

const updateMeasureController = async (
  id,
  { name, value, unit }
) => {
  const measure = await getMeasureByIdController(id);
  measure.name = name;
  measure.value = value;
  measure.unit = unit;
  await measure.save();
  return measure;
};

const deleteMeasureController = async (id) => {
  const measure = await getMeasureByIdController(id);
  await measure.destroy();
};

export {
  getAllMeasuresController,
  getMeasureByIdController,
  createMeasureController,
  updateMeasureController,
  deleteMeasureController,
};
