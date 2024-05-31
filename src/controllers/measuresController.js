import { Measure } from "../database/db.js";

const getMeasuresController = async () => {
  const measures = await Measure.findAll();

  if (measures.length === 0) throw Error("No Measures found");

  return measures;
};

const bulkCreateMeasures = async () => {
  const measuresData = [
    {
      name: "small",
      value: 3000,
      measures: "10 x 10 x 10",
    },
    {
      name: "medium",
      value: 4500,
      measures: "20 x 20 x 20",
    },
    {
      name: "big",
      value: 6000,
      measures: "30 x 30 x 30",
    },
  ];

  const measures = await Measure.findAll();

  if (measures.length === 0) {
    await Measure.bulkCreate(measuresData);
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

export { getMeasuresController, getMeasureByIdController, bulkCreateMeasures };
