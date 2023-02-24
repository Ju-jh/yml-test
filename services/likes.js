import LikeRepository from '../repositories/likes.js';
import jwt from 'jsonwebtoken';

class LikeService {
    likeRepository = new LikeRepository();

    getAllLikeService = async (_, res) => {
        try {
            const data = await this.likeRepository.getAll();
            return res.status(200).json({ post: [data] });
        } catch (error) {
            return res.status(400).json({
                errorMessage: '좋아요 게시글 조회에 실패하였습니다.',
            });
        }
    };

    updateLikeService = async (req, res) => {
        const { postId } = req.params;
        const token = req.cookies.Authorization;
        const splitedToken = token.split(' ')[1];
        const decodedToken = jwt.decode(splitedToken);
        const postfind = await this.likeRepository.getById(postId);
        if (!postfind) {
            return res
                .status(404)
                .json({ errorMessage: '게시글이 존재하지 않습니다.' });
        }
        const isLike = await this.likeRepository.likeCheck(
            postId,
            decodedToken.userId
        );
        if (isLike == null) {
            await this.likeRepository.likeUpdate(postId, decodedToken.userId);

            return res
                .status(200)
                .json({ message: '게시글의 좋아요를 등록하였습니다.' });
        } else if (isLike) {
            await this.likeRepository.unlikeUpdate(postId, decodedToken.userId);
            return res
                .status(200)
                .json({ message: '게시글의 좋아요를 취소하였습니다.' });
        }
    };
}

export default LikeService;
