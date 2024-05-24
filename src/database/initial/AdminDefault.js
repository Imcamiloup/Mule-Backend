import sequelize from '../db.js'; 
import { registercontroller } from '../../controllers/usersController.js';



// Función para crear el usuario por defecto
const createDefaultUser = async () => {
  try {
    // Valores del usuario por defecto obtenidos desde el archivo .env
    const defaultUser = {
      name: process.env.ADMIN_USERNAME,
      email: process.env.ADMIN_EMAIL, 
      password: process.env.ADMIN_PASSWORD,
      role: process.env.ADMIN_ROLE,
      isActive: process.env.ADMIN_ISACTIVE
      // Otros campos del usuario
    };

    // Conecta con la base de datos
    await sequelize.sync();

    // Crea el usuario en la base de datos
    await registercontroller(defaultUser);

    console.log('Usuario por defecto creado exitosamente.');
  } catch (error) {
    console.error('Error al crear el usuario por defecto:', error);
  }
};

// Llama a la función para crear el usuario por defecto
export {
    createDefaultUser
}
