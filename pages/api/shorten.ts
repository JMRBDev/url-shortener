import { NextApiRequest, NextApiResponse } from "next";
import firebase from "../../lib/firebase";
import ShortUniqueId from 'short-unique-id';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let { method, body } = req;

  try {
    if (method.toUpperCase() === 'POST') {
      const uid = new ShortUniqueId({length: 6});
      body = JSON.parse(body);

      const slug = body.slug || uid();

      const alreadyExists = (await firebase.collection('urls').doc(slug).get()).exists;

      if (!alreadyExists) {
        await firebase
        .collection('urls')
        .doc(slug)
        .set({
          url: body.url,
          slug
        });

        res.status(200).send('URL Shortened');
      } else {
        res.status(409).send(`A shortened URL with slug ${slug} already exists`);
      }
    } else {
      res.status(500).send(`HTTP method ${method.toUpperCase()} not allowed`);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export default handler;