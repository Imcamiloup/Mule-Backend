import { Measure } from "../database/db.js";

const getOrCreateMeasuresController = async () => {
  const small = await Measure.findOrCreate({
    where: {
      name: "small",
      value: 15000,
      measures: "10 x 10 x 10",
    },
  });

  const medium = await Measure.findOrCreate({
    where: {
      name: "medium",
      value: 30000,
      measures: "20 x 20 x 20",
    },
  });

  const big = await Measure.findOrCreate({
    where: {
      name: "big",
      value: 45000,
      measures: "30 x 30 x 30",
    },
  });

  function mapResults(result) {
    return {
      id: result[0].id,
      name: result[0].name,
      value: result[0].value,
      measures: result[0].measures,
    };
  }

  const results = [mapResults(small), mapResults(medium), mapResults(big)];

  return results;
};

const bulkCreateMeasures = async () => {
  const measures = [
    {
      name: "small",
      value: 15000,
      measures: "10 x 10 x 10",
    },
    {
      name: "medium",
      value: 30000,
      measures: "20 x 20 x 20",
    },
    {
      name: "big",
      value: 45000,
      measures: "30 x 30 x 30",
    },
  ];

  await Measure.bulkCreate(measures);
};

const getMeasureByIdController = async (id) => {
  try {
    const measure = await Measure.findByPk(id);
    return measure;
  } catch (error) {
    throw new Error("Error getting measure: " + error.message);
  }
};

export {
  getOrCreateMeasuresController,
  getMeasureByIdController,
  bulkCreateMeasures,
};
