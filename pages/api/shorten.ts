import { NextApiRequest, NextApiResponse } from "next";
import firebase from "../../lib/firebase";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const newUrl = await firebase.collection('urls').add({ url: 'testUrl', slug: 'testSlug' });
  console.log(newUrl);

  console.log('handler');

  res.status(200).send('works');
};

export default handler;