import express, { Request, Response } from 'express';
import sequelize from './utils/db';
import path from 'path';
import User from './routers/users';
import Product from './routers/products'
const app = express();

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//Routes
app.use('/user', User);
app.use('/product', Product);

const PORT = process.env.PORT || 3000;

//Db & Server conntections
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('Connected to database');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
  });
