import CostRepository from '../repositories/comments.js';
import jwt from 'jsonwebtoken';

class CommentService {
    costRepository = new CostRepository();

    createCommentService = async (req, res) => {
        const { comment } = req.body;
        const token = req.cookies.Authorization;
        const splitedToken = token.split(' ')[1];
        const decodedToken = jwt.decode(splitedToken);
        await this.costRepository.commentCreate(comment, decodedToken.userId);
        return res.status(201).json({ message: '댓글 작성에 성공하였습니다.' });
    };

    getAllCommentService = async (_, res) => {
        const data = await this.costRepository.getAll();
        return res.status(200).json({ post: [data] });
    };

    updateCommentService = async (req, res) => {
        const { commentId } = req.params;
        const { comment } = req.body;
        const token = req.cookies.Authorization;
        const splitedToken = token.split(' ')[1];
        const decodedToken = jwt.decode(splitedToken);
        const updatefind = await this.costRepository.getById(commentId);
        if (!updatefind) {
            return res
                .status(404)
                .json({ errorMessage: '댓글 번호가 존재하지 않습니다.' });
        }
        if (updatefind.dataValues.userId != decodedToken.userId) {
            return res
                .status(403)
                .json({ errorMessage: '로그인이 필요한 기능입니다.' });
        }
        await this.costRepository.commentUpdate(commentId, comment);
        return res.status(200).json({ message: '게시글을 수정하였습니다.' });
    };

    deleteCommentService = async (req, res) => {
        const token = req.cookies.Authorization;
        const { commentId } = req.params;
        const splitedToken = token.split(' ')[1];
        const decodedToken = jwt.decode(splitedToken);
        const deletefind = await this.costRepository.getById(commentId);
        if (!deletefind) {
            return res
                .status(404)
                .json({ errorMessage: '댓글이 존재하지 않습니다.' });
        }
        if (deletefind.dataValues.userId != decodedToken.userId) {
            return res
                .status(403)
                .json({ errorMessage: '로그인이 필요한 기능입니다.' });
        }
        await this.costRepository.commentRemove(commentId);
        return res.status(200).json({ message: '댓글을 삭제하였습니다.' });
    };
}

export default CommentService;
