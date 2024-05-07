import {
  createEnlistment,
  getEnlistments,
  getEnlistmentById,
  updateEnlistment,
  deleteEnlistment,
} from "../controllers/enlistmentsController.js";

export const createEnlistmentHandler = async (req, res) => {
  const {
    shipping_date,
    sender,
    origin,
    destiny,
    status,
    service_type,
    vehicle_id,
    driver_id,
  } = req.body;

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
  try {
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

    // if (vehicle_id.length !== 36)
    //   throw Error("Characters of vehicle id must be 36");

    // if (driver_id.length !== 36)
    //   throw Error("Characters of vehicle id must be 36");

    await createEnlistment(
      shipping_date,
      senderFixed.trim(),
      originLowerCase.trim(),
      destinyLowerCase.trim(),
      statusLowerCase.trim(),
      service_typeLowerCase.trim(),
      vehicle_id.trim(),
      driver_id.trim()
    );

    res.status(201).json({
      "Enlistment created": {
        shipping_date,
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

export const getEnlistmentsHandler = async (req, res) => {
  try {
    const { shipping_date, sender, origin, destiny, status, service_type } =
      req.query;
    const querys = {};
    let enlistments;

    if (shipping_date) querys.shipping_date = shipping_date;
    if (sender) querys.sender = sender;
    if (origin) querys.origin = origin;
    if (destiny) querys.destiny = destiny;
    if (status) querys.status = status;
    if (service_type) querys.service_type = service_type;

    querys
      ? (enlistments = await getEnlistments(querys))
      : (enlistments = await getEnlistments());

    const enlistmentsMaped = enlistments.map((elem) => {
      return {
        id: elem.id,
        shipping_date: elem.shipping_date,
        sender: elem.sender,
        origin: elem.origin,
        destiny: elem.destiny,
        status: elem.status,
        service_type: elem.service_type,
        vehicles: elem.Vehicles.map((elem) => elem.id),
        drivers: elem.Drivers.map((elem) => elem.id),
      };
    });

    res.status(200).json(enlistmentsMaped);
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
    //
  } = req.body;
  try {
    await updateEnlistment();

    //

    res.status(200).json({
      "Enlistment updated": {
        //
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
