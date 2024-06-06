import {
  createBranch,
  getBranches,
  getBranchById,
} from "../controllers/branchesController.js";

import {
  validateOnlyLetters,
  validateOnlyNumbers,
  validateDirection,
  validateLengthFromTo,
  validateExactLength,
} from "../utils/Validate/validateBranches/validateBranches.js";

export const getBranchesHandler = async (req, res) => {
  const { province, direction, phone, orderBy, orderDirection } = req.query;

  try {
    const branches = await getBranches(
      province,
      direction,
      phone,
      orderBy,
      orderDirection
    );

    res.status(200).json(branches);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const createBranchHandler = async (req, res) => {
  const { province, direction, phone } = req.body;

  try {
    validateOnlyLetters({ province });
    validateOnlyNumbers(phone);
    validateDirection(direction);
    validateLengthFromTo(province, 3, 30, "province");
    validateLengthFromTo(direction, 3, 25, "direction");
    validateExactLength(phone, 10, "phone");

    await createBranch(province, direction, phone);

    res.sendStatus(201);
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
