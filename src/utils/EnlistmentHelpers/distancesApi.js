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

export default DISTANCES;

