require('dotenv').config();

const express = require('express');
const myRouter = express.Router();
const router = require('./router/index.js');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(myRouter);

myRouter.get('/', router.home);
//creates users table in specified db
myRouter.put('/create/usersdb', router.createUserDb);

myRouter.get('/all/users', router.getAllUsers);
myRouter.get('/admin/users', router.getAllAdminUsers);
myRouter.put('/create/admin/user', router.createNewAdminUser);



//creates a role can be later assigned to user
myRouter.put('/create/role', router.createUserRole);
//gets all user roles in roles table
myRouter.get('/user/role', router.getUserRoles);
// deletes a role by id from roles table
myRouter.delete('/delete/role/:id', router.deleteUserRole);
// updates or patches a role name or description by when role found by id first
myRouter.patch('/modify/role/:id', router.modifyUserRole);







const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`service is running on http://localhost:${PORT}`);
});
