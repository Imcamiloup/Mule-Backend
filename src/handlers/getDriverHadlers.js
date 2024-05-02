
export const getDriverHandler = (req, res) => {
  try {
    res.status(200).send("Hola desde el endpoint driver");
  } catch (error) {
    res.status(500).send({ error: error.error });
  }
};