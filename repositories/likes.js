import { Likes } from '../models/likes.js';
import { Posts, LIKE_USER } from '../models/posts.js';

class LikeRepository {
    likeUpdate = async (postId, userId) => {
        return await Likes.create({ postPostId: postId, userUserId: userId });
    };

    unlikeUpdate = async (postId, userId) => {
        return await Likes.destroy({
            where: { postPostId: postId, userUserId: userId },
        });
    };

    getById = async (postId) => {
        return Posts.findByPk(postId);
    };

    likeCheck = async (postId, userId) => {
        return await Likes.findOne({
            where: { postPostId: postId, userUserId: userId },
        });
    };

    getAll = async () => {
        return Posts.findAll({ ...LIKE_USER, group: 'postId' });
    };
}
export default LikeRepository;
