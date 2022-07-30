const { DataTypes } = require('sequelize');
const User = require('../models/user');
const ContactInfo = require('../models/contact-info');
const Role = require('../models/role');
const db = require('../database/db.js');
const { DATEONLY } = require('sequelize');

// home controller
const home = (req, res) => {
  res.send('home controller responding ...');
};

// for global admin only to drop & re-sync userdb
const createModelsInDbController = async (req, res) => {
  User.hasOne(ContactInfo, {
    forignKey: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  });
  ContactInfo.belongsTo(User);
  User.hasOne(Role, {
    forignKey: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  });
  Role.belongsTo(User, {
    forignKey: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  });

  const results = await db
    .sync({ force: true })
    .then((results) => {
      res.send('User Table Was Created Successfully ...');
    })
    .catch((err) => {
      res.send(err);
    });
};

const createUserInDbController = async (req, res) => {
  let = { fname, lname, uname, password, dob } = req.body;

  if (!fname || fname === null || fname === '') {
    return res.send('Need first name ...');
  } else {
    fname = fname.charAt(0).toUpperCase() + fname.slice(1);
  }

  if (!lname || lname === null || lname === '') {
    // no lastname let's set to empty string
    lname = '';
  } else {
    lname = lname.charAt(0).toUpperCase() + lname.slice(1);
  }

  if ((!uname || uname === null || uname === '') && lname.length === 0) {
    uname = fname[0].toUpperCase() + '.Doe';
  }

  if ((!uname || uname === null || uname === '') && lname.length > 0) {
    uname = fname[0] + lname;
  }

  if (uname.length > 0) {
    uname = uname;
  }

  if (!password || password === null || password === '') {
    password = '';
  } else {
    password = password;
  }

  if (!dob || dob === null || dob === '') {
    console.log('no date given at all ...');
  } else {
    if (typeof dob === Date()) {
      console.log('date given is vallid');
      dob = dob;
    } else {
      console.log('date given is invalid date resetting to blank');
      date = '';
    }
  }

  return (user = await User.create({
    firstName: fname,
    lastName: lname,
    username: uname,
    password: password,
    dateOfBirth: dob,
  }).then((user) => {
    res.send(user);
  }));
};

const createAdminUserController = async (req, res) => {
  let = { fname, lname, uname, password, dob } = req.body;

  if (!fname || fname === null || fname === '') {
    return res.send('Need first name ...');
  } else {
    fname = fname.charAt(0).toUpperCase() + fname.slice(1);
  }

  if (!lname || lname === null || lname === '') {
    // no lastname let's set to empty string
    lname = '';
  } else {
    lname = lname.charAt(0).toUpperCase() + lname.slice(1);
  }

  if ((!uname || uname === null || uname === '') && lname.length === 0) {
    uname = fname[0].toUpperCase() + '.Doe';
  }

  if ((!uname || uname === null || uname === '') && lname.length > 0) {
    uname = fname[0] + lname;
  }

  if (uname.length > 0) {
    uname = uname;
  }

  if (!password || password === null || password === '') {
    password = '';
  } else {
    password = password;
  }

  if (!dob || dob === null || dob === '') {
    console.log('no date given at all ...');
  } else {
    if (typeof dob === Date()) {
      console.log('date given is vallid');
      dob = dob;
    } else {
      console.log('date given is invalid date resetting to blank');
      date = '';
    }
  }

  if (typeof dob === DataTypes.DATEONLY) {
    const user = await User.create({
      firstName: fname,
      lastName: lname,
      username: uname,
      password: password,
      dateOfBirth: dob,
    });
    const role = await Role.create({
      RoleTitle: 'admin',
      RoleDescription: 'admin role',
      UserUserUUId: user.userUUId,
    });
    res.send({ user, role });
  } else {
    const user = await User.create({
      firstName: fname,
      lastName: lname,
      username: uname,
      password: password,
    });
    const role = await Role.create({
      RoleTitle: 'admin',
      RoleDescription: 'admin role',
      UserUserUUId: user.userUUId,
    });
    res.send({ user, role });
  }
};

module.exports = {
  home,
  createModelsInDbController,
  createUserInDbController,
  createAdminUserController,
};
