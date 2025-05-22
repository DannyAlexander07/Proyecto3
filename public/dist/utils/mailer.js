"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer = require('nodemailer');
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Cargar las variables de entorno
// Crear el transporte de correo
const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVER,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS, // Tu contraseña de correo
    },
});
// Función para enviar un correo
const sendEmail = (to, subject, text) => {
    return transporter.sendMail({
        from: process.env.MAIL_USER,
        to,
        subject,
        text,
    });
};
exports.sendEmail = sendEmail;
