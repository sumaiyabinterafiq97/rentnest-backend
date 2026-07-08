import { AuthRoutes } from '../../modules/auth/auth.route';
import { PropertyRoutes } from '../../modules/property/property.route';
import { CategoryRoutes } from '../../modules/category/category.route';
import { RentalRoutes } from '../../modules/rental/rental.route';
import { LandlordRoutes } from '../../modules/landlord/landlord.route';
import { AdminRoutes } from '../../modules/admin/admin.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/properties',
    route: PropertyRoutes,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/rentals',
    route: RentalRoutes,
  },
  {
    path: '/landlord',
    route: LandlordRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
