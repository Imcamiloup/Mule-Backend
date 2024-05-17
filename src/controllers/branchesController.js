import { Branch } from "../database/db.js";

export const createBranch = async (
  province,
  city,
  zip_code,
  direction,
  phone,
  type
) => {
  const newBranch = await Branch.create({
    province,
    city,
    zip_code,
    direction,
    phone,
    type,
  });

  return newBranch;
};

export const getBranches = async (
  province,
  city,
  zip_code,
  direction,
  phone,
  type,
  orderBy,
  orderDirection
) => {
  let where = {};

  if (province) where = { ...where, province };
  if (city) where = { ...where, city };
  if (zip_code) where = { ...where, zip_code };
  if (direction) where = { ...where, direction };
  if (phone) where = { ...where, phone };
  if (type) where = { ...where, type };

  let order = [];

  if (orderBy && orderDirection) order = [[orderBy, orderDirection]];

  const branches = await Branch.findAll({
    where,
    order,
  });

  if (branches.length === 0) throw Error("No branches found");

  return branches;
};

export const getBranchById = async (id) => {
  if (id.length !== 36) throw Error("id must have 36 characters long");

  const branch = await Branch.findByPk(id);

  if (!branch) throw Error(`Branch with ID: ${id} not found`);

  return branch;
};

export const updateBranch = async (
  id,
  province,
  city,
  zip_code,
  direction,
  phone,
  type
) => {
  if (!id) throw Error("Missing id field");

  const branchById = await Branch.findByPk(id);

  if (!branchById) throw Error(`Branch with ID: ${id} not found`);

  await branchById.update({
    province,
    city,
    zip_code,
    direction,
    phone,
    type,
  });
};

export const deleteBranch = async (id) => {
  if (!id) throw Error();

  const branchById = Branch.findByPk(id);

  if (!branchById) throw Error(`Branch with ID: ${id} not found`);

  branchById.destroy({
    where: {
      id: id,
    },
  });
};
