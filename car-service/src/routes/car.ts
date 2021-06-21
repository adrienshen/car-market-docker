import Router from 'koa-router';
import { getCars, getOneCar, handleErrors } from '../controller/car';

const router = new Router();
const BASE_URL = '/v1/cars';

router.use(handleErrors);
router.get(`${BASE_URL}/:id`, getOneCar);
router.get(BASE_URL, getCars);

export default router;
