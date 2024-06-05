import { Vehicle } from "../database/db.js";

export const getVehicles = async () => {
  const vehicles = await Vehicle.findAll();

  if (vehicles.length === 0) throw Error("Vehicles not found");

  return vehicles;
};

export const createVehicle = async (
  model,
  state,
  car_insurance,
  plate,
  tecnical_review,
  driving_licence,
  cargo_manifest,
  news
) => {
  const newVehicle = await Vehicle.create({
    model,
    state,
    car_insurance,
    plate,
    tecnical_review,
    driving_licence,
    cargo_manifest,
    news,
  });

  return newVehicle;
};


export const getVehiclesByQuery = async (
  model,
  state,
  car_insurance,
  plate,
  tecnical_review,
  driving_licence,
  cargo_manifest,
  orderBy,
  orderDirection
) => {
  let where = {};
  if (model) where = { ...where, model };
  if (state) where = { ...where, state };
  if (car_insurance) where = { ...where, car_insurance };
  if (plate) where = { ...where, plate };
  if (tecnical_review) where = { ...where, tecnical_review };
  if (driving_licence) where = { ...where, driving_licence };
  if (cargo_manifest) where = { ...where, cargo_manifest };
  let order = [];
  if (orderBy && orderDirection) order = [[orderBy, orderDirection]];

  const vehicles = await Vehicle.findAll({
    where,
    order,
  });

  if (vehicles.length === 0) throw Error("Vehicles not found");

  return vehicles;
};

export const getVehicleById = async (id) => {
  const vehicleById = await Vehicle.findByPk(id);

  return vehicleById;
};

export const updateVehicle = async (
  id,
  state,
  tecnical_review,
  cargo_manifest,
  news
) => {
  const vehicleById = await Vehicle.findByPk(id);

  if (!vehicleById) throw Error("Vehicle not found");

  await vehicleById.update({
    id,
    state,
    tecnical_review,
    cargo_manifest,
    news,
  });
};

export const bulkCreateVehicles = async () => {
  const vehiclesData = [
    {
      model: "1FTFW1ET7EKE10324",
      state: "active",
      car_insurance: "124234563563",
      plate: "AB-123-XY",
      tecnical_review: "RTEF-AR-2039-98765",
      driving_licence: 23456789,
      cargo_manifest: true,
      news: "Seguro renovado el 15/06/2024",
    },
    {
      model: "2FZHAZAS34AN20485",
      state: "active",
      car_insurance: "128934563567",
      plate: "AA-789-ZT",
      tecnical_review: "RTGH-AR-2041-54321",
      driving_licence: 98765432,
      cargo_manifest: true,
      news: "Cambios en la poliza, contactar al asegurador",
    },
    {
      model: "1GNEK13ZX3J307402",
      state: "active",
      car_insurance: "364234563862",
      plate: "AC-456-PO",
      tecnical_review: "RTRE-AR-2042-98765",
      driving_licence: 34567890,
      cargo_manifest: true,
      news: "Proximo vencimiento de seguro el 25/07/2024",
    },
    {
      model: "3FA6P0H70FR118974",
      state: "active",
      car_insurance: "831234564863",
      plate: "AC-890-KL",
      tecnical_review: "RTHY-AR-2043-67890",
      driving_licence: 45678901,
      cargo_manifest: true,
      news: "Recordatorio de pago de seguro pendiente",
    },
    {
      model: "1M8GDM9AXKP042788",
      state: "active",
      car_insurance: "135234567596",
      plate: "AD-234-JP",
      tecnical_review: "RTJK-AR-2044-23456",
      driving_licence: 56789012,
      cargo_manifest: true,
      news: "Cambio de titularidad, actualizar datos de contacto",
    },
    {
      model: "JH4TB2H26CC000459",
      state: "active",
      car_insurance: "269534563585",
      plate: "AG-567-BR",
      tecnical_review: "RTGH-AR-2045-67890",
      driving_licence: 67890123,
      cargo_manifest: true,
      news: "Perdida de vigencia de seguro, renovar cuanto antes",
    },
    {
      model: "5NPEB4AC9DH713562",
      state: "active",
      car_insurance: "124234563213",
      plate: "AD-901-QW",
      tecnical_review: "RTJH-AR-2046-34567",
      driving_licence: 78901234,
      cargo_manifest: true,
      news: "Proximo control tecnico el 10/09/2024",
    },
    {
      model: "1N4AL3AP3DN453327",
      state: "active",
      car_insurance: "124237555563",
      plate: "AF-123-CD",
      tecnical_review: "RTRE-AR-2047-89012",
      driving_licence: 89012345,
      cargo_manifest: true,
      news: "Actualizacion de cobertura, verificar detalles",
    },
    {
      model: "1C4RJFAG7FC602798",
      state: "active",
      car_insurance: "124796456356",
      plate: "AD-456-ZT",
      tecnical_review: "RTYU-AR-2048-12345",
      driving_licence: 90123456,
      cargo_manifest: true,
      news: "Recordatorio de revision tecnica anual",
    },
    {
      model: "1ZVBP8AM6D5241650",
      state: "active",
      car_insurance: "124234426988",
      plate: "AF-789-JK",
      tecnical_review: "RTAS-AR-2049-67890",
      driving_licence: 12345678,
      cargo_manifest: true,
      news: "Cambio de direccion, actualizar datos de contacto",
    },
  ];

  const vehicles = await Vehicle.findAll();

  if (vehicles.length === 0) {
    await Vehicle.bulkCreate(vehiclesData);
  }
};
