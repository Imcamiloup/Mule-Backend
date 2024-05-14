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

  const noSpecialCharactersRgex = /^[a-zA-Z0-9\s]+$/;
  const onlyNumbersRgex = /^\d+$/;

  try {
    if (!noSpecialCharactersRgex.test(state))
      throw Error("No special characteres allowed in state (#$%^&*_-)");

    if (!noSpecialCharactersRgex.test(distance))
      throw Error("No special characteres allowed in distance (#$%^&*_-)");

    if (!noSpecialCharactersRgex.test(delivery_time))
      throw Error("No special characteres allowed in delivery time (#$%^&*_-)");

    if (!noSpecialCharactersRgex.test(order_time))
      throw Error("No special characteres allowed in order time (#$%^&*_-)");

    if (!onlyNumbersRgex.test(price_order))
      throw Error("Only numbers are allowed in price order");

    if (!noSpecialCharactersRgex.test(qualify_user))
      throw Error("No special characteres allowed in qualify user (#$%^&*_-)");

    if (!onlyNumbersRgex.test(qualify))
      throw Error("Only numbers are allowed in qualify");

    if (
      String(qualify) !== "1" &&
      String(qualify) !== "2" &&
      String(qualify) !== "3" &&
      String(qualify) !== "4" &&
      String(qualify) !== "5"
    )
      throw Error("Qualify input only allow from 1 to 5");

    if (!noSpecialCharactersRgex.test(comment))
      throw Error("No special characters allowed in comments (#$%^&*_-)");

    const newEnlistment = await createEnlistment(
      state.toLowerCase().trim(),
      distance.toLowerCase().trim(),
      delivery_time.toLowerCase().trim(),
      order_time.toLowerCase().trim(),
      price_order,
      qualify_user.toLowerCase().trim(),
      qualify,
      comment.toLowerCase().trim(),
      ordershipment_id,
      driver_id
    );

    res.status(200).json(newEnlistment);
  } catch (error) {
    res.status(400).json({ error: error.message });
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
        ordershipment_id: elem.ordershipment_id,
        drivers: elem.Drivers.map((elem) => elem.id),
        guide_number: elem.guide_number,
        state: elem.state,
        distance: elem.distance,
        delivery_time: elem.delivery_time,
        order_time: elem.order_time,
        price_order: elem.price_order,
        qualify_user: elem.qualify_user,
        qualify: elem.qualify,
        comment: elem.comment,
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
  } = req.body;

  const noSpecialCharactersRgex = /^[a-zA-Z0-9\s]+$/;
  const onlyNumbersRgex = /^\d+$/;

  try {
    if (!noSpecialCharactersRgex.test(state))
      throw Error("No special characteres allowed in state (#$%^&*_-)");

    if (!noSpecialCharactersRgex.test(distance))
      throw Error("No special characteres allowed in distance (#$%^&*_-)");

    if (!noSpecialCharactersRgex.test(delivery_time))
      throw Error("No special characteres allowed in delivery time (#$%^&*_-)");

    if (!noSpecialCharactersRgex.test(order_time))
      throw Error("No special characteres allowed in order time (#$%^&*_-)");

    if (!onlyNumbersRgex.test(price_order))
      throw Error("Only numbers are allowed in price order");

    if (!noSpecialCharactersRgex.test(qualify_user))
      throw Error("No special characteres allowed in qualify user (#$%^&*_-)");

    if (!onlyNumbersRgex.test(qualify))
      throw Error("Only numbers are allowed in qualify");

    if (!noSpecialCharactersRgex.test(comment))
      throw Error("No special characters allowed in comments (#$%^&*_-)");

    await updateEnlistment(
      id,
      state.toLowerCase().trim(),
      distance.toLowerCase().trim(),
      delivery_time.toLowerCase().trim(),
      order_time.toLowerCase().trim(),
      price_order,
      qualify_user.toLowerCase().trim(),
      qualify,
      comment.toLowerCase().trim()
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
        qualify: qualify,
        comment: comment.toLowerCase(),
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
