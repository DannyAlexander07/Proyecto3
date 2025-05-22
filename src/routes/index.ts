import { Router } from 'express';
import PageController from '../controllers/PageController';

const router = Router();

// Página principal (Home)
router.get(['/', '/home'], PageController.home);

// Otras páginas
router.get('/adn_mood', PageController.adnMood);
router.get('/mood_print', PageController.moodPrint);
router.get('/whatsyourmood', PageController.whatsYourMood);
router.get('/contact', PageController.contactForm);

// Enviar formulario de contacto
router.post('/submit', PageController.submitForm);

// Página de éxito
router.get('/success', PageController.success);

export default router;
