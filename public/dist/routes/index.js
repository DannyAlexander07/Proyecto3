"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PageController_1 = __importDefault(require("../controllers/PageController"));
const router = (0, express_1.Router)();
// Página principal (Home)
router.get(['/', '/home'], PageController_1.default.home);
// Otras páginas
router.get('/adn_mood', PageController_1.default.adnMood);
router.get('/mood_print', PageController_1.default.moodPrint);
router.get('/whatsyourmood', PageController_1.default.whatsYourMood);
router.get('/contact', PageController_1.default.contactForm);
// Enviar formulario de contacto
router.post('/submit', PageController_1.default.submitForm);
// Página de éxito
router.get('/success', PageController_1.default.success);
exports.default = router;
