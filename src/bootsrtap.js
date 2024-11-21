import userRouter from './Modules/user/user.router.js';
import noteRouter from './Modules/note/note.router.js';
import  { connection }  from './DB/connection.js';

function bootsrtap (express, app) {
  app.use(express.json());
  app.use(userRouter);
  app.use(noteRouter);
  connection();
}

export default bootsrtap;