require('dotenv').config();

const express = require('express');
const myRouter = express.Router();
const router = require('./router/index.js');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(myRouter);

myRouter.get('/', router.home);
//creates All Models in db in form of tables for each model, also will link up associations.
myRouter.put('/reset/all/models', router.createModelsInDb);
// create a user only without a role or contactinfo
myRouter.post('/create/user', router.creatUser);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`service is running on http://localhost:${PORT}`);
});
