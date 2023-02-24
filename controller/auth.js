import AuthService from '../services/auth.js';

class AuthController {
    authService = new AuthService();

    signup = async (req, res) => {
        await this.authService.createUserService(req, res);
    };

    login = async (req, res) => {
        await this.authService.loginUserService(req, res);
    };
}

export default AuthController;
