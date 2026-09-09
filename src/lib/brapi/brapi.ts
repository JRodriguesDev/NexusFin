import 'dotenv/config';

import Brapi from 'brapi';

const client = new Brapi({
  apiKey: process.env.BRAPI_API_KEY,
});

export { client as brapi };
