import { app } from './app';
import { initializeDatabase } from './database';

(async () => {
  await initializeDatabase({});
  app.listen(3333, () =>  console.log('🚀 Server is running') );
})()
