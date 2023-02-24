import CommentService from '../services/comments.js';

class CommentController {
    commentService = new CommentService();

    createComment = async (req, res) => {
        await this.commentService.createCommentService(req, res, comment);
    };

    getAllComment = async (_, res) => {
        await this.commentService.getAllCommentService(_, res);
    };

    updateComment = async (req, res) => {
        await this.commentService.updateCommentService(req, res);
    };

    deleteComment = async (req, res) => {
        await this.commentService.deleteCommentService(req, res);
    };
}

export default CommentController;
