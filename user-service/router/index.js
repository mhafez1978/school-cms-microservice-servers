const controllers = require("../controllers/index.js");

const home = (req, res) => {
  return controllers.home(req,res);
};

const createUserDb = (req,res)=>{
  return controllers.createUserDbController(req,res)
}

const createUserRole = (req, res) => {
  return controllers.createUserRoleController(req,res)
}

const getUserRoles = (req,res) => {
  return controllers.getUserRolesController(req,res)
}

const deleteUserRole = (req, res) => {
  return controllers.deleteUserRoleController(req,res)

}

const modifyUserRole = (req,res) => {
  return controllers.modifyUserRoleController(req,res)
}

module.exports = { home, createUserDb, createUserRole, getUserRoles, deleteUserRole, modifyUserRole };
