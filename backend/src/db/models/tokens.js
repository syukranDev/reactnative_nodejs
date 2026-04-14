import { DataTypes } from 'sequelize';

export function defineTokens(sequelize) {
  return sequelize.define(
    'tokens',
    {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      user_id: { type: DataTypes.BIGINT, allowNull: false },
      access_token: { type: DataTypes.TEXT, allowNull: false },
      refresh_token: { type: DataTypes.TEXT, allowNull: false },
      access_expires_at: { type: DataTypes.DATE, allowNull: false },
      refresh_expires_at: { type: DataTypes.DATE, allowNull: false },
      revoked_at: { type: DataTypes.DATE },
      created_at: { type: DataTypes.DATE },
      updated_at: { type: DataTypes.DATE },
    },
    {
      tableName: 'tokens',
      timestamps: false,
      underscored: true,
    }
  );
}

