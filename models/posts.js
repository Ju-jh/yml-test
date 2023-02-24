import SQ from 'sequelize';
import { sequelize } from '../db/database.js';
import { User } from './auth.js';
import { Likes } from './likes.js';
const DataTypes = SQ.DataTypes;
const Sequelize = SQ.Sequelize;

export const Posts = sequelize.define(
    'posts',
    {
        postId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    { timestamps: true }
);
Posts.belongsTo(User);
Posts.hasMany(Likes, { as: 'lk' });

export const INCLUDE_USER = {
    attributes: [
        'postId',
        [Sequelize.col('User.userId'), 'userId'],
        [Sequelize.col('User.nickname'), 'nickname'],
        'title',
        'createdAt',
        'updatedAt',
    ],
    include: {
        model: User,
        attributes: [],
    },
};

export const DETAIL_USER = {
    attributes: [
        'postId',
        [Sequelize.col('User.userId'), 'userId'],
        [Sequelize.col('User.nickname'), 'nickname'],
        'title',
        'content',
        'createdAt',
        'updatedAt',
    ],
    include: {
        model: User,
        attributes: [],
    },
};

export const ORDER_DESC = {
    order: [['postId', 'DESC']],
};

export const LIKE_USER = {
    attributes: [
        'postId',
        [Sequelize.col('User.userId'), 'userId'],
        [Sequelize.col('User.nickname'), 'nickname'],
        'title',
        'content',
        'createdAt',
        'updatedAt',
        [sequelize.fn('COUNT', sequelize.col('lk.likeId')), 'likes'],
    ],
    include: [
        {
            model: User,
            attributes: [],
        },
        {
            model: Likes,
            as: 'lk',
            attributes: [],
        },
    ],
};
