import { NextApiRequest, NextApiResponse } from "next";
import firebase from "../../lib/firebase";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  try {
    if (method.toUpperCase() === 'GET') {
        const urls = (await firebase.collection('urls').get()).docs;

        urls.forEach((url) => console.log(url.data().slug));

        res.status(200).send('urls fetched');
    } else {
      res.status(500).send(`HTTP method ${method.toUpperCase()} not allowed`);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export default handler;