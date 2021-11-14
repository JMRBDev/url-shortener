import { NextApiRequest, NextApiResponse } from "next";
import firebase from "../../lib/firebase";
import NextCors from 'nextjs-cors';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await NextCors(req, res, {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  });

  const { method, query } = req;
  const { slug } = query;

  try {
    if (method.toUpperCase() === 'GET') {
        const urlObject = await firebase.collection('urls').doc(slug as string).get();

      if (urlObject.data()) {
        res.status(200).json({
          destination: urlObject.data().url,
        });
      } else {
        res.status(404).json({
          destination: '404',
        });
      }
    } else if (method.toUpperCase() === 'DELETE') {
      await firebase.collection('urls').doc(slug as string).delete();

      res.status(200).send(`URL with slug '${slug}' has been successfully deleted`);
    } else {
      res.status(500).send(`HTTP method ${method.toUpperCase()} not allowed`);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export default handler;