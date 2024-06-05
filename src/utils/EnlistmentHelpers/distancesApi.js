import { Driver } from "../../database/db.js";

const DISTANCES = {
  "buenos aires": {
    cordoba: 695,
    corrientes: 801,
    "entre rios": 362,
    "santa fe": 475,
  },
  cordoba: {
    "buenos aires": 695,
    corrientes: 882,
    "entre rios": 596,
    "santa fe": 340,
  },
  corrientes: {
    "buenos aires": 801,
    cordoba: 882,
    "entre rios": 533,
    "santa fe": 606,
  },
  "entre rios": {
    "buenos aires": 362,
    cordoba: 596,
    corrientes: 533,
    "santa fe": 271,
  },
  "santa fe": {
    "buenos aires": 475,
    cordoba: 340,
    corrientes: 606,
    "entre rios": 271,
  },
};

export const TIMES = {
  "buenos aires": {
    cordoba: "10 days",
    corrientes: "12 days",
    "entre rios": "7 days",
    "santa fe": "4 days",
  },
  cordoba: {
    "buenos aires": "10 days",
    corrientes: "15 days",
    "entre rios": "7 days",
    "santa fe": "4 days",
  },
  corrientes: {
    "buenos aires": "12 days",
    cordoba: "15 days",
    "entre rios": "7 days",
    "santa fe": "10 days",
  },
  "entre rios": {
    "buenos aires": "7 days",
    cordoba: "7 days",
    corrientes: "7 days",
    "santa fe": "4 days",
  },
  "santa fe": {
    "buenos aires": "4 days",
    cordoba: "4 days",
    corrientes: "10 days",
    "entre rios": "4 days",
  },
};

export const calculateWeightByInput = (idMeasure) => {
  if (idMeasure == 1) {
    return Number(3000);
  } else if (idMeasure == 2) {
    return Number(4500);
  } else if (idMeasure == 3) {
    return Number(6000);
  }
};

export const calculateCost = (weight, distance) => {
  const ratePerKgPerKm = 0.01;
  return weight * distance * ratePerKgPerKm;
};

export const selectDriver = async (city_transmiter) => {
  function elegirAleatoriamente() {
    return Math.floor(Math.random() * 2);
  }

  if (city_transmiter === "cordoba") {
    const findDriver = await Driver.findAll({
      where: {
        branch_id: 1,
      },
    });
    return findDriver[elegirAleatoriamente()].id;
  } else if (city_transmiter === "corrientes") {
    const findDriver = await Driver.findAll({
      where: {
        branch_id: 2,
      },
    });
    return findDriver[elegirAleatoriamente()].id;
  } else if (city_transmiter === "santa fe") {
    const findDriver = await Driver.findAll({
      where: {
        branch_id: 3,
      },
    });
    return findDriver[elegirAleatoriamente()].id;
  } else if (city_transmiter === "entre rios") {
    const findDriver = await Driver.findAll({
      where: {
        branch_id: 4,
      },
    });
    return findDriver[elegirAleatoriamente()].id;
  } else if (city_transmiter === "buenos aires") {
    const findDriver = await Driver.findAll({
      where: {
        branch_id: 5,
      },
    });
    return findDriver[elegirAleatoriamente()].id;
  }
};

export default DISTANCES;
