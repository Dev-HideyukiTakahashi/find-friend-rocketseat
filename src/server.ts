import { app } from './app.js';
import { env } from './utils/env.js';

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log(`Server is running at port: 3000`);
  });
