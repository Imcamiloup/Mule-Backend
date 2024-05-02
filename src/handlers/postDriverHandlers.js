export const postDriverHandler = (req, res) => {
  try {
    res.status(200).send("Creando un nuevo driver");
  } catch (error) {
    res.status(500).send({ error: error.error });
  }
};