export async function health(req, res) {
  try {
    return res.status(200).send({ status: 'ok' });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal Server Error' });
  }
}

