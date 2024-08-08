import express from 'express';
import cors from 'cors';

import config from './config.js';
import productRoute from './Routes/productRoute.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', productRoute);

//routes
app.use('/api', productRoute);

app.listen(config.port, () =>
  console.log(`Server is live @ ${config.hostUrl}`),
);