import {
  getEnlistments,
  getEnlistmentById,
  patchEnlistment,
  deleteEnlistment,
} from "../controllers/enlistmentsController.js";

import {
  validateMissingInformation,
  validateOnlyLetters,
} from "../utils/Validate/validateReviews/validateReviews.js";

export const getEnlistmentsHandler = async (req, res) => {
  const {
    guide_number,
    state,
    distance,
    delivery_time,
    order_time,
    price_order,
    orderBy,
    orderDirection,
  } = req.query;

  try {
    const enlistments = await getEnlistments(
      guide_number,
      state,
      distance,
      delivery_time,
      order_time,
      price_order,
      orderBy,
      orderDirection
    );

    res.status(200).json(enlistments);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const getEnlistmentByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const enlistmentById = await getEnlistmentById(id);

    if (!enlistmentById) throw Error(`Enlistment with ID: ${id} not found`);

    res.status(200).json({ enlistment: enlistmentById });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const patchEnlistmentHandler = async (req, res) => {
  const { id } = req.params;
  const { state, delivery_time } = req.body;

  try {
    validateMissingInformation({ state, delivery_time });

    validateOnlyLetters(state, "state");
    validateOnlyLetters(delivery_time, "delivery time");

    await patchEnlistment(id, state, delivery_time);

    res.sendStatus(200);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteEnlistmentHandler = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteEnlistment(id);

    res.status(200).json({ message: `Enlistment with ID: ${id} deleted` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

