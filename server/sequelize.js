// @flow
import Sequelize from 'sequelize';
import EncryptedField from 'sequelize-encrypted';
import debug from 'debug';

export const encryptedFields = EncryptedField(
  Sequelize,
  process.env.SECRET_KEY
);

export const DataTypes = Sequelize;
export const Op = Sequelize.Op;

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  typeValidation: true,
  logging: debug('sql'),
  ssl: process.env.NODE_ENV === 'production',
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production',
  },
});
