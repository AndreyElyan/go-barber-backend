import { Router } from 'express';
import User from './app/models/users';

const routes = new Router();

routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Andrey ELyan',
    email: 'a.elyan.s@gmail.com',
    password_hash: '123456',
  });

  res.json({ message: 'Hello Guys' });
});

module.exports = routes;
