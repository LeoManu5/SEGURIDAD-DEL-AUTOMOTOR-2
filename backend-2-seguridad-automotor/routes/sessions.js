import { Router } from 'express';
import passport from 'passport';
import sessionController from '../controllers/sessionController.js';

const router = Router();

router.post('/register', sessionController.register);
router.post('/login', sessionController.login);
router.get(
    '/current',
    passport.authenticate('jwt', { session: false }),
    sessionController.currentUser
);

export default router;
