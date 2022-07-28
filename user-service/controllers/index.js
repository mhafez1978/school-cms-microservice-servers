const db = require('../database/db.js');
const User = require('../models/user');
const Role = require('../models/role');

// home controller
const home = (req, res) => {
  res.send('home controller responding ...');
};

// for global admin only to drop & re-sync userdb
const createUserDbController = async (req, res) => {
  Role.hasMany(User);
  User.hasOne(Role);
  User.belongsTo(Role);

  const results = await db
    .sync({ force: true })
    .then((results) => {
      res.send('User Table Was Created Successfully ...');
    })
    .catch((err) => {
      res.send(err);
    });
};

// user controller
const getAllUsersController = async (req, res) => {
  const data = await User.findAll();
  if (data === null || data.length === 0) {
    res.send('No users found in db ...');
  } else {
    return res.send(data);
  }
};

const createNewAdminUserController = async (req, res) => {
  const {
    fname,
    lname,
    pnumber,
    email,
    username,
    pass,
    dob,
    al1,
    al2,
    city,
    state,
    zcode,
  } = req.body;
  if (!fname || !lname || fname === undefined || lname === undefined) {
    res.send(
      'first name , last name and role id are required to create a user ...'
    );
  } else {
    const adminRole = await Role.create({
      roleTitle: 'admin',
      roleDescription: 'School Admin',
    })
      .then((adminRole) => {
        let roleId = adminRole.dataValues.roleId;
        roleId = Number(roleId);
        return roleId;
      })
      .then(async (roleId) => {
        return (admin = await User.create({
          firstName: fname,
          lastName: lname,
          phoneNumber: pnumber,
          email: email,
          username: username,
          password: pass,
          dateOfBirth: dob,
          addressLine1: al1,
          addressLine2: al2,
          city: city,
          state: state,
          zipCode: zcode,
          roleRoleId: roleId,
        }).then(async (admin) => {
          await admin.save();
          res.send(admin);
        }));
      });
  }
};

const getAllAdminUsersConroller = async (req, res) => {
  const data = await Role.findAll({
    include: User,
  });
  res.send(data);
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
      console.log(data.dataValues);
      return res.send(data[0]);
    })
    .catch((err) => {
      return res.send(err);
    });
};

module.exports = {
  home,
  createUserDbController,
  getAllUsersController,
  createNewAdminUserController,
  getAllAdminUsersConroller,
  createUserRoleController,
  getUserRolesController,
  deleteUserRoleController,
  modifyUserRoleController,
};
