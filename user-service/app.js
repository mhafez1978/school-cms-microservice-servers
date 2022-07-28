require('dotenv').config();

const express = require('express');
const myRouter = express.Router();
const router = require('./router/index.js');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(myRouter);

myRouter.get('/', router.home);
myRouter.put('/create/usersdb', router.createUserDb);
myRouter.put('/create/role', router.createUserRole);
myRouter.get('/user/role', router.getUserRoles);
myRouter.delete('/delete/role/:id', router.deleteUserRole);
myRouter.patch('/modify/role/:id', router.modifyUserRole);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`service is running on http://localhost:${PORT}`);
});
