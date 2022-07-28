const { DataTypes } = require('sequelize');
const db = require('../database/db');

const Role = db.define(
  'role',
  {
    roleId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    roleTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    onDelete: 'cascade',
  }
);

module.exports = Role;
