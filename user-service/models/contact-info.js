const db = require('../database/db');
const { DataTypes } = require('sequelize');

const ContactInfo = db.define(
  'ContactInfo',
  {
    contactInfoId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    phoneNumber1: {
      type: DataTypes.STRING,
    },
    phoneNumber1: {
      type: DataTypes.STRING,
    },
    emailAddress: {
      type: DataTypes.STRING,
    },
    alternativeEmail: {
      type: DataTypes.STRING,
    },
    addressLine1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    addressLine2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    zipCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    onDelete: 'cascade',
  }
);

module.exports = ContactInfo;
