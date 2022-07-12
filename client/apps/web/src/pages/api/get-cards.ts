// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

type Data = {
  name: string;
};

export default async function getCards(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const response = await axios.get('https://randommer.io/api/Card', {
    headers: {
      'X-Api-Key': 'f3b80c8d2c6a478e89445e919e625fff',
    },
  });

  const result = response.data;
  res.status(200).json(result);
}
