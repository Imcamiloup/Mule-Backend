import {
  createBranch,
  getBranches,
  getBranchById,
  // updateBranch,
  // deleteBranch,
} from "../controllers/branchesController.js";

import {
  validateOnlyLetters,
  validateOnlyNumbers,
  validateZipCode,
  validateDirection,
  validateLengthFromTo,
  validateExactLength,
} from "../utils/Validate/validateBranches/validateBranches.js";

export const getBranchesHandler = async (req, res) => {
  const {
    province,
    city,
    zip_code,
    direction,
    phone,
    type,
    orderBy,
    orderDirection,
  } = req.query;

  try {
    const branches = await getBranches(
      province,
      city,
      zip_code,
      direction,
      phone,
      type,
      orderBy,
      orderDirection
    );

    res.status(200).json(branches);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const createBranchHandler = async (req, res) => {
  const { province, city, zip_code, direction, phone, type } = req.body;

  try {
    validateOnlyLetters({ province, city, type });
    validateOnlyNumbers(phone);
    validateZipCode(zip_code);
    validateDirection(direction);
    validateLengthFromTo(province, 3, 30, "province");
    validateLengthFromTo(city, 3, 20, "city");
    validateLengthFromTo(direction, 3, 25, "direction");
    validateLengthFromTo(type, 2, 15, "direction");
    validateExactLength(phone, 10, "phone");

    const newBranch = await createBranch(
      province,
      city,
      zip_code,
      direction,
      phone,
      type
    );

    res.status(201).json({ "Branch created": newBranch });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const getBranchByIdHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const branchById = await getBranchById(id);

    res.status(200).json(branchById);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
