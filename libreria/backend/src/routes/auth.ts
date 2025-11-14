import { Router } from 'express';
import * as ctrl from '../controllers/authController';
import * as authMiddleware from '../middlewares/auth';
const requireAuth = (authMiddleware as any).default?.requireAuth ?? (authMiddleware as any).requireAuth;

const router = Router();

const _ctrl: any = ctrl as any;
router.post('/register', _ctrl.default?.register ?? _ctrl.register);
router.post('/login', _ctrl.default?.login ?? _ctrl.login);
router.put('/profile', requireAuth, _ctrl.default?.updateProfile ?? _ctrl.updateProfile);

export default router;
