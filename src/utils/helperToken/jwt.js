import jwt from "jsonwebtoken";

// Función para generar un token JWT de un solo uso
const generateEmailVerificationToken = (email, username) => {
  try {
    const token = jwt.sign({ email, username }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    return token;
  } catch (error) {
    console.error("Error al generar el token:", error);
    throw error;
  }
};

// Función para generar un token JWT para restablecer la contraseña
const generatePasswordReset = (email) => {
  try {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "5m",
    });
    

    return token;
  } catch (error) {
    console.error("Error al generar el token:", error);
    throw error;
  }
};

const generateAuthToken = (userId, email, role, name, isActive) => {
  try {
    return jwt.sign(
      { id: userId, email, role, name, isActive },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
  } catch (error) {
    console.error("Error al generar el token:", error);
    throw error;
  }
};

export {
  generateEmailVerificationToken,
  generateAuthToken,
  generatePasswordReset,
};
