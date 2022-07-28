const db = require('../database/db.js');
const User = require('../models/user');
const Role = require('../models/role');

// home controller
const home = (req, res) => {
  res.send('home controller responding ...');
};

// for global admin only to drop & re-sync userdb
const createUserDbController = async (req, res) => {
  User.belongsTo(Role);
  Role.hasMany(User);

  const results = await db
    .sync({ force: true })
    .then((results) => {
      res.send('User Table Was Created Successfully ...');
    })
    .catch((err) => {
      res.send(err);
    });
};

// for global admin only to create roles to assign to each registered user to manage access and authorization
const createUserRoleController = async (req, res) => {
  let title = req.body.title;
  let description = req.body.description;
  if (!title || title === undefined || title === '') {
    return res.send('Role Title is required');
  }
  if (!description || description === undefined || description === '') {
    description = '';
  }
  const newRole = await Role.create({
    roleTitle: title,
    roleDescription: description,
  }).then(async (newrole) => {
    const results = await Role.findAll();
    return res.send(results);
  });
};

// for admin only will get all existing user roles
const getUserRolesController = async (req, res) => {
  const results = await Role.findAll();
  if (results.length === 0) {
    res.send('sorry no roles created yet ...');
  } else {
    res.send(results);
  }
};

const deleteUserRoleController = async (req, res) => {
  const id = req.params.id;
  const results = await Role.destroy({
    where: {
      roleId: id,
    },
  })
    .then(async () => {
      return (data = await Role.findAll());
    })
    .then((data) => {
      if (data.length === 0) {
        res.send('No Roles left to delete ...');
      } else {
        res.send(data);
      }
    });
};

const modifyUserRoleController = async (req, res) => {
  const id = Number(req.params.id);
  let title = req.body.title;
  let description = req.body.description;
  if (Number(id) !== Number(id)) {
    console.log(
      'This is not valid role id.\n Please enter a valid role id this is required in order to modify a role by the role id ...'
    );
  }
  const role2modify = await Role.findOne({
    where: {
      roleId: id,
    },
  })
    .then(async (role2modify) => {
      if (role2modify === null) {
        res.send('sorry role not found by the given role id ...');
      } else {
        if (
          !title ||
          title === undefined ||
          title === '' ||
          !description ||
          description === undefined ||
          description === ''
        ) {
          return res.send(role2modify);
        } else {
          data = await Role.upsert({
            roleId: id,
            roleTitle: title,
            roleDescription: description,
          });
          return data;
        }
      }
    })
    .then((data) => {
		console.log(data.dataValues)
      return res.send(data[0]);
    })
    .catch((err) => {
      return res.send(err);
    });
};

module.exports = {
  home,
  createUserDbController,
  createUserRoleController,
  getUserRolesController,
  deleteUserRoleController,
  modifyUserRoleController,
};
