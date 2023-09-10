import jwt, {JwtPayload} from 'jsonwebtoken';
import config from '../config/config';

interface CustomJwtPayload extends JwtPayload {
    userId: number;
}

const generateToken = (userId: number) => {
    return jwt.sign({ userId }, config.jwtSecret, { expiresIn: '1h' });
};

function verifyToken (token: string) {
    try {
      const decoded = jwt.verify(token, config.jwtSecret) as CustomJwtPayload;
      return decoded;
    } catch (error) {
      return null;
    }
  };

export { generateToken, verifyToken };
