import { Op } from'sequelize';

const filteredAndOrderedData = async (
  Model,
  filters,
  orderBy,
  orderDirection 
) => {
  let where = {};
  if (filters) {
    for (const key in filters) {
      if (filters[key]) {
        where[key] = {
          [Op.iLike]: `%${filters[key]}%`,
        };
      }
    }
  }

  let order = [];
  if (orderBy && orderDirection || orderDefault) {
    order = [[orderBy,orderDefault || orderDirection]];
  }

  try {
    const data = await Model.findAll({
      where,
      order,
    });

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default filteredAndOrderedData;
