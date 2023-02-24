import { Comments, INCLUDE_USER, ORDER_DESC } from '../models/comments.js';

class CostRepository {
    commentCreate = async (comment, userId) => {
        return await Comments.create({ comment, userUserId: userId });
    };

    getAll = async () => {
        return Comments.findAll({ ...INCLUDE_USER, ...ORDER_DESC });
    };

    getById = async (commentId) => {
        return Comments.findOne({
            where: { commentId },
            ...INCLUDE_USER,
        });
    };

    commentUpdate = async (commentId, comment) => {
        return Comments.findByPk(commentId, INCLUDE_USER).then((comments) => {
            comments.comment = comment;
            return comments.save();
        });
    };

    commentRemove = async (commentId) => {
        return Comments.findByPk(commentId) //
            .then((comment) => {
                comment.destroy();
            });
    };
}
export default CostRepository;
