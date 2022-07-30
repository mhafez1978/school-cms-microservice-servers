const controllers = require('../controllers/index.js');

const home = (req, res) => {
  return controllers.home(req, res);
};

const createModelsInDb = (req, res) => {
  return controllers.createModelsInDbController(req, res);
};

const creatUser = (req, res) => {
  return controllers.createUserInDbController(req,res);
}


module.exports = {
  home,
  createModelsInDb,
  creatUser,
  
};
