// fieldValidations.js

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPassword = (password) => {
  // Validar que la contraseña tenga al menos 8 caracteres y contenga al menos una letra mayúscula, una letra minúscula, un número y un carácter especial
  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters long");
  }

  if (!/(?=.*[a-z])/.test(password)) {
    throw new Error("Password must contain at least one lowercase letter");
  }

  if (!/(?=.*[A-Z])/.test(password)) {
    throw new Error("Password must contain at least one uppercase letter");
  }

  if (!/(?=.*\d)/.test(password)) {
    throw new Error("Password must contain at least one number");
  }

  if (!/(?=.*[!@#$%^&*])/.test(password)) {
    throw new Error("Password must contain at least one special character");
  }

  return true;
};

const isValidDebit = (debit) => {
  // Validar que el débito sea un número válido
  if (isNaN(debit)) {
    throw new Error("Invalid debit format");
  }

  return true;
};

const isValidAntiquity = (antiquity) => {
  // Validar que la antigüedad sea un número válido
  if (isNaN(antiquity)) {
    throw new Error("Invalid antiquity format");
  }

  return true;
};

const isValidStatus = (status) => {
  // Validar que el estado sea uno de los valores válidos
  const validStatuses = ["disponible", "en asignacion", "en ruta"];
  if (!validStatuses.includes(status)) {
    throw new Error("Invalid status format");
  }

  return true;
};

const isValidVehicleId = (vehicle_id) => {
  // Validar que el vehicle_id sea un UUID válido
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(vehicle_id)) {
    throw new Error("Invalid vehicle ID format");
  }

  return true;
};

export {
  isValidEmail,
  isValidPassword,
  isValidDebit,
  isValidAntiquity,
  isValidStatus,
  isValidVehicleId,
};
