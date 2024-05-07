import {
  createEnlistment,
  getEnlistsments,
  getEnlistmentById,
  updateEnlistment,
  deleteEnlistment,
} from "../controllers/enlistmentsController.js";

export const createEnlistmentHandler = async (req, res) => {
  const {
    destiny,
    state,
    distance,
    delivery_time,
    // order_time,
    // price_order,
    // qualify_user,
    // qualify_order,
    freigth_description,
    freigth_weigth,
    freigth_measures,
    freigth_type,
    vehicle_id,
  } = req.body;

  try {
    await createEnlistment(
      destiny,
      state,
      distance,
      delivery_time,
      // order_time,
      // price_order,
      // qualify_user,
      // qualify_order,
      freigth_description.trim(),
      freigth_weigth.trim(),
      freigth_measures.trim(),
      freigth_type.trim(),
      vehicle_id
    );

    res.status(201).json({
      "Enlistment created": {
        destiny,
        state,
        distance,
        delivery_time,
        // order_time,
        // price_order,
        // qualify_user,
        // qualify_order,
        freigth_description,
        freigth_weigth,
        freigth_measures,
        freigth_type,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getEnlistmentsHandler = async (req, res) => {
  try {
    const enlistments = await getEnlistsments();

    const enlistmentsMaped = enlistments.map((elem) => {
      return {
        id: elem.id,
        destiny: elem.destiny,
        state: elem.state,
        distance: elem.distance,
        delivery_time: elem.delivery_time,
        freigth_description: elem.freigth_description,
        freigth_weigth: elem.freigth_weigth,
        freigth_measures: elem.freigth_measures,
        freigth_type: elem.freigth_type,
        vehicles: elem.Vehicles.map((elem) => elem.id),
      };
    });

    res.status(200).json({ enlistments: enlistmentsMaped });
  } catch (error) {
    res.status(400).json({ error: error.message });
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
export const updateEnlistmentHandler = async (req, res) => {
  const { id } = req.params;
  const {
    destiny,
    state,
    distance,
    delivery_time,
    // order_time,
    // price_order,
    // qualify_user,
    // qualify_order,
    freigth_description,
    freigth_weigth,
    freigth_measures,
    freigth_type,
  } = req.body;

  try {
    await updateEnlistment(
      id,
      destiny,
      state,
      distance,
      delivery_time,
      // order_time,
      // price_order,
      // qualify_user,
      // qualify_order,
      freigth_description.trim(),
      freigth_weigth.trim(),
      freigth_measures.trim(),
      freigth_type.trim()
    );

    res.status(200).json({
      "Enlistment updated": {
        id,
        destiny,
        state,
        distance,
        delivery_time,
        // order_time,
        // price_order,
        // qualify_user,
        // qualify_order,
        freigth_description,
        freigth_weigth,
        freigth_measures,
        freigth_type,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const deleteEnlistmentHandler = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteEnlistment(id);
    res.status(200).json({
      "Enlistment deteled": `Enlistment with ID: ${id} was deleted`,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
