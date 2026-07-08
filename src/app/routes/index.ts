import express from 'express';
import { AuthRoutes } from '../../modules/auth/auth.route';
// other routes will be imported here

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
