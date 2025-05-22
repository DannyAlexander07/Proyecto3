const nodemailer = require('nodemailer');
import dotenv from 'dotenv';

dotenv.config(); // Cargar las variables de entorno

// Crear el transporte de correo
const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVER,  // Usa el servicio que desees (Ejemplo con Gmail)
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,    // Tu correo de envío
    pass: process.env.MAIL_PASS,    // Tu contraseña de correo
  },
});

// Función para enviar un correo
export const sendEmail = (to: string, subject: string, text: string) => {
  return transporter.sendMail({
    from: process.env.MAIL_USER,  // Correo de salida
    to,                          // Correo de destino
    subject,
    text,
  });
};
