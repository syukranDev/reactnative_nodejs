import { DataTypes } from 'sequelize';

export function defineUsers(sequelize) {
  return sequelize.define(
    'users',
    {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      email: { type: DataTypes.STRING(255) },
      password: { type: DataTypes.STRING(255) },
    },
    {
      tableName: 'users',
      timestamps: false,
      underscored: true,
    }
  );
}

