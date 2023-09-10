import express, { Request, Response } from 'express';
import Product from '../models/product';
import authMiddleware from '../middleware/auth';
import upload from '../utils/multer';

interface MulterRequest extends Request {
    files: any;
}

const router = express.Router();

router.post('/', [upload ,authMiddleware] ,async (req: Request, res: Response) => {
    const imageResult  = (req as MulterRequest).files[0].path as any ;
    const image = imageResult; 

    const { title, price} = req.body;
    const userId = req.user.userId; //access the decoded userId from req.user in authmidlleware


    const product = await Product.create({ title, price, image, userId }); //create and save product in DB

    res.status(200).send(product);
})

router.get('/',async (req: Request, res: Response) =>{
    const produtcs = await Product.findAll();
    res.send(produtcs);
})

router.get('/:id',async (req: Request, res: Response) =>{
    const id = parseInt(req.params.id);
    const produtcs = await Product.findByPk(id)
    res.send(produtcs);
})

router.put('/:id', authMiddleware ,async (req:Request, res:Response) => {
    const productId = parseInt(req.params.id);
    const {title, price, image} = req.body;
    const userId = req.user.userId;

    const product = await Product.findByPk(productId);
    if(!product) {
        return res.status(404).send('product not found');
    }

    if (product?.userId !== userId) { //cheack the product owner is the same who logged in
        return res.status(403).send({ message: 'You do not have permission to edit this product' });
    }

    await product.update({title,price,image});
    res.send(product);
});

router.delete('/:id', authMiddleware ,async (req:Request, res:Response) => {
    const productId = parseInt(req.params.id);
    const userId = req.user.userId;

    const product = await Product.findByPk(productId);
    if(!product) {
        return res.status(404).send('product not found');
    }

    if (product?.userId !== userId) {
        return res.status(403).send({ message: 'You do not have permission to edit this product' });
    }

    await product.destroy();
    res.send('Product deleted successfully');
});

export default router;