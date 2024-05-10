import {
  createEnlistment,
  getEnlistments,
  getEnlistmentsByQuery,
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
      state,
      distance,
      delivery_time,
      order_time,
      price_order,
      qualify_user,
      qualify,
      comment,
      ordershipment_id,
      driver_id
    );

    res.status(200).json({ newEnlistment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEnlistmentsHandler = async (req, res) => {
  try {
    const enlistments = getEnlistments();

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
export const updateEnlistmentHandler = async (req, res) => {
  const { id } = req.params;
  const { shipping_date, sender, origin, destiny, status, service_type } =
    req.body;
  try {
    const validateShipping_date = /^\d{4}-\d{2}-\d{2}$/.test(shipping_date);

    let senderFixed;
    let senderSplit = sender.split(" ");

    for (let i = 0; i < senderSplit.length; i++) {
      senderSplit[i] =
        senderSplit[i].charAt(0).toUpperCase() +
        senderSplit[i].slice(1).toLowerCase();

      senderFixed = senderSplit.join(" ");
    }

    const originLowerCase = origin.toLowerCase();
    const destinyLowerCase = destiny.toLowerCase();
    const statusLowerCase = status.toLowerCase();
    const service_typeLowerCase = service_type.toLowerCase();

    if (!validateShipping_date)
      throw Error("Shipping date must be in this format: YYYY-MM-DD");

    if (senderFixed.length < 3 || senderFixed.length > 30)
      throw Error("Characters of sender must be between 3 and 30");

    if (originLowerCase.length < 3 || originLowerCase.length > 30)
      throw Error("Characters of origin must be between 3 and 30");

    if (destinyLowerCase.length < 3 || destinyLowerCase.length > 30)
      throw Error("Characters of destiny must be between 3 and 30");

    if (statusLowerCase.length < 3 || statusLowerCase.length > 30)
      throw Error("Characters of status must be between 3 and 30");

    if (service_typeLowerCase.length < 3 || service_typeLowerCase.length > 30)
      throw Error("Characters of service type must be between 3 and 30");

    await updateEnlistment(
      id,
      shipping_date,
      senderFixed.trim(),
      originLowerCase.trim(),
      destinyLowerCase.trim(),
      statusLowerCase.trim(),
      service_typeLowerCase.trim()
    );

    res.status(200).json({
      "Enlistment updated": {
        id,
        shipping_date: shipping_date,
        sender: senderFixed.trim(),
        origin: originLowerCase.trim(),
        destiny: destinyLowerCase.trim(),
        status: statusLowerCase.trim(),
        service_type: service_typeLowerCase.trim(),
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
