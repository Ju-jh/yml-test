import SQ from 'sequelize';
import { sequelize } from '../db/database.js';
import { User } from './auth.js';
const DataTypes = SQ.DataTypes;

export const Likes = sequelize.define(
    'likes',
    {
        likeId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
    },
    { timestamps: true }
);
Likes.belongsTo(User);
