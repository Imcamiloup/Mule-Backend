import { Branch } from "../database/db.js";

export const createBranch = async (province, direction, phone) => {
  const newBranch = await Branch.create({
    province,
    direction,
    phone,
  });

  return newBranch;
};

export const getBranches = async (
  province,
  direction,
  phone,
  orderBy,
  orderDirection
) => {
  let where = {};

  if (province) where = { ...where, province };
  if (direction) where = { ...where, direction };
  if (phone) where = { ...where, phone };

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

export const bulkCreateBranches = async () => {
  const BranchesData = [
    {
      province: "cordoba",
      direction: "Independencia 258",
      phone: 3517642569,
    },
    {
      province: "corrientes",
      direction: "Ayacucho 2767",
      phone: 3797698741,
    },
    {
      province: "santa fe",
      direction: "Belgrano 3599",
      phone: 3427612435,
    },
    {
      province: "entre rios",
      direction: "Ayacucho 1643",
      phone: 3434685231,
    },
    {
      province: "buenos aires",
      direction: "Moreno 306",
      phone: 1117654426,
    },
  ];

  const branches = await Branch.findAll();

  if (branches.length === 0) {
    await Branch.bulkCreate(BranchesData);
  }
};
