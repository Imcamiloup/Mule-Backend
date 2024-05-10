import { Op } from'sequelize';

const FilteredAndOrderedData = async (
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
  if (orderBy && orderDirection) {
    order = [[orderBy, orderDirection]];
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

export default FilteredAndOrderedData;
