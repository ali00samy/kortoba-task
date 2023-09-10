import express , {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user';
import { generateToken } from '../utils/auth';

const router = express();

router.post('/signup', async (req: Request, res: Response) => {
    const {email , password} = req.body;

    const user = await User.findOne({where: {email: email}});
    if (user) return res.status(400).send('User already registered'); //cheack if the user is already registered

    const hashedPassword = await bcrypt.hash(password, 10); //hash the passsword
    const savedUser = await User.create({email, password: hashedPassword}); //create and save user in DB
    
    res.status(201).send(savedUser); 
})

router.post('/login', async (req:Request, res:Response) => {
    const {email, password} = req.body;

    const user = await User.findOne({where: {email}}); 

    if (user && (await bcrypt.compare(password, user.password))) { //cheack if the credentials correct
        const token = generateToken(user.id);
        res.status(200).send({token});
    } else {
        res.status(401).send('Invalid username or password')
    }
})

export default router;