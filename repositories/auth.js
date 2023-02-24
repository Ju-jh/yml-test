import { User } from '../models/auth.js';

class AuthRepository {
    createUser = async (nickname, password) => {
        return User.create({ nickname, password });
    };

    findByUsername = async (nickname) => {
        return User.findOne({ where: { nickname: nickname } });
    };
}

export default AuthRepository;
