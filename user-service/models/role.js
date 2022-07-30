const db = require('../database/db');
const { DataTypes } = require('sequelize');

const Role = db.define(
  'Role',
  {
    RoleId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    RoleTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    RoleDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    onDelete: 'cascade',
  }
);

module.exports = Role;
