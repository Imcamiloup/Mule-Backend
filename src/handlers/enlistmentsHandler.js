import {
  createEnlistment,
  getEnlistments,
  getEnlistmentById,
  updateEnlistment,
  deleteEnlistment,
} from "../controllers/enlistmentsController.js";

export const createEnlistmentHandler = async (req, res) => {
  const {
    state,
    distance,
    delivery_time,
    order_time,
    price_order,
    qualify_user,
    qualify,
    comment,
    ordershipment_id,
    driver_id,
  } = req.body;

  try {
    const newEnlistment = await createEnlistment(
      state.toLowerCase().trim(),
      distance.toLowerCase().trim(),
      delivery_time.toLowerCase().trim(),
      order_time.toLowerCase().trim(),
      price_order,
      qualify_user.toLowerCase().trim(),
      qualify.toLowerCase().trim(),
      comment.toLowerCase(),
      ordershipment_id,
      driver_id.trim()
    );

    res.status(200).json({ newEnlistment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEnlistmentsHandler = async (req, res) => {
  const {
    guide_number,
    state,
    distance,
    delivery_time,
    order_time,
    price_order,
    qualify_user,
    qualify,
    comment,
    ordershipment_id,
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
      qualify_user,
      qualify,
      comment,
      ordershipment_id,
      orderBy,
      orderDirection
    );

    const enlistmentMaped = enlistments.map((elem) => {
      return {
        id: elem.id,
        guide_number: elem.guide_number,
        state: elem.state,
        distance: elem.distance,
        delivery_time: elem.delivery_time,
        order_time: elem.order_time,
        price_order: elem.price_order,
        qualify_user: elem.qualify_user,
        qualify: elem.qualify,
        comment: elem.comment,
        ordershipment_id: elem.ordershipment_id,
        drivers: elem.Drivers.map((elem) => elem.id),
      };
    });

    res.status(200).json(enlistmentMaped);
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
export const updateEnlistmentHandler = async (req, res) => {
  const { id } = req.params;
  const {
    state,
    distance,
    delivery_time,
    order_time,
    price_order,
    qualify_user,
    qualify,
    comment,
    ordershipment_id,
  } = req.body;

  try {
    await updateEnlistment(
      id,
      state.toLowerCase().trim(),
      distance.toLowerCase().trim(),
      delivery_time.toLowerCase().trim(),
      order_time.toLowerCase().trim(),
      price_order.trim(),
      qualify_user.toLowerCase().trim(),
      qualify.toLowerCase().trim(),
      comment.toLowerCase().trim(),
      ordershipment_id
    );
    res.status(200).json({
      "Updated Enlistment": {
        id,
        state: state.toLowerCase(),
        distance: distance.toLowerCase(),
        delivery_time: delivery_time.toLowerCase(),
        order_time: order_time.toLowerCase(),
        price_order,
        qualify_user: qualify_user.toLowerCase(),
        qualify: qualify.toLowerCase(),
        comment: comment.toLowerCase(),
        ordershipment_id: ordershipment_id,
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
