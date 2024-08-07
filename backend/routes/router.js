import express from 'express';
import { controller } from '../controllers/controller.js';
const router = express.Router();


router.get('/', controller.home)
router.post('/usuarios', controller.register)
router.get('/usuarios', controller.profile)
router.post('/login', controller.login)
router.get('*', controller.notFound)

export default router;