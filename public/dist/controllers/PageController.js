"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { escape } from 'mysql2'; 
class PageController {
    // Renderizar la página principal (Home)
    static home(req, res) {
        res.render('home', { title: 'Agencia Digital Creativa - MOOD', page: 'home', meta_description: 'Mood: La agencia de comunicación que revoluciona el marketing. Especialistas en ATL, Digital, PR y BTL, ofrecemos soluciones para potenciar tu marca.', title_heading: 'Agencia Digital Creativa', pageImage: 'images/Mood-thumbnail.webp', pageUrl: req.protocol + '://' + req.get('host') + req.originalUrl, pageType: 'video.mp4', locale: 'es_PE', imageWidth: '1200', imageHeight: '630', pageVideo: 'videos/video.mp4' });
    }
    // Renderizar la página ADN Mood
    static adnMood(req, res) {
        res.render('adn_mood', { title: 'Conóce nuestro ADN - MOOD', page: 'adn_mood', meta_description: 'Conóce la historia y cultura de nuestra agencia de comunicaciones mood con presencia en Panamá, Colombia y Perú. servicios de mktg digital, ATL y BTL.', title_heading: 'Conócenos', pageImage: 'images/Mood-thumbnail.webp', pageUrl: req.protocol + '://' + req.get('host') + req.originalUrl, pageType: 'website', locale: 'es_PE', imageWidth: '1200', imageHeight: '630' });
    }
    // Renderizar la página Mood Print
    static moodPrint(req, res) {
        res.render('mood_print', { title: 'Servicios - MOOD', page: 'mood_print', meta_description: 'Descubre el poder de Mood: expertos en servicios de social media marketing, ecommerce, performance marketing, influencer marketing y más.', title_heading: 'Servicios', pageImage: 'images/Mood-thumbnail.webp', pageUrl: req.protocol + '://' + req.get('host') + req.originalUrl, pageType: 'website', locale: 'es_PE', imageWidth: '1200', imageHeight: '630' });
    }
    // Renderizar la página What’s Your Mood
    static whatsYourMood(req, res) {
        res.render('whatsyourmood', { title: 'Blog, agencia creativa digital - MOOD', page: 'whatsyourmood', meta_description: 'Explora nuestro blog y descubre temas fascinantes como marketing, digital planning, inteligencia artificial, ecommerce, entre otros.', title_heading: 'Blog', pageImage: 'images/Mood-thumbnail.webp', pageUrl: req.protocol + '://' + req.get('host') + req.originalUrl, pageType: 'website', locale: 'es_PE', imageWidth: '1200', imageHeight: '630' });
    }
    // Renderizar el formulario de contacto
    static contactForm(req, res) {
        res.render('contact', { title: 'Contáctanos - MOOD', page: 'contact', meta_description: 'Contáctanos a Mood, estamos aquí para ayudarte. Completa nuestro formulario de contacto y permítenos brindarte soluciones con nuestra agencia creativa', title_heading: 'Contáctanos', pageImage: 'images/Mood-thumbnail.webp', pageUrl: req.protocol + '://' + req.get('host') + req.originalUrl, pageType: 'website', locale: 'es_PE', imageWidth: '1200', imageHeight: '630' });
    }
    // Procesar el envío del formulario de contacto
    static submitForm(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, phone, company, country, message } = req.body;
            // Validación de los campos
            if (!name || !company || !email || !phone || !country || !message) {
                res.status(400).send('Todos los campos son obligatorios.');
                return;
            }
            if (name.length > 50 || company.length > 50 || email.length > 30 || phone.length > 15 || country.length > 15) {
                res.status(400).send('Uno o más campos tienen un tamaño excesivo.');
                return;
            }
            // Prevenir inyecciones SQL usando escape
            const sanitizedName = escape(name);
            const sanitizedEmail = escape(email);
            const sanitizedMessage = escape(message);
            // Obtener la fecha actual
            const currentDate = new Date().toISOString(); // Se guarda en formato ISO, puedes usar el formato que desees.
            try {
                // Guardar en la base de datos (incluyendo la fecha actual)
                // await db.execute('INSERT INTO messages (name, email, phone, company, country, message, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)', [
                //   sanitizedName,
                //   sanitizedEmail,
                //   phone,
                //   company,
                //   country,
                //   sanitizedMessage,
                //   currentDate
                // ]);
                // Enviar el correo de confirmación al dueño (aquí puedes agregar todos los campos)
                // await sendEmail(
                //   'dnancay@mood.pe',  // Cambia esto por el correo del dueño
                //   '[MOOD] Formulario de Contacto',
                //   `Nuevo mensaje recibido:\n\n
                //   Nombre: ${name}\n
                //   Empresa: ${company}\n
                //   Correo: ${email}\n
                //   Teléfono: ${phone}\n
                //   País: ${country}\n
                //   Mensaje: ${message}\n
                //   Fecha: ${currentDate}`
                // );
                // Redirigir a la página de éxito
                res.redirect('/success');
            }
            catch (error) {
                console.error('Error al procesar el formulario:', error);
                res.status(500).send('Error al procesar el formulario');
            }
        });
    }
    // Renderizar la página de éxito
    static success(req, res) {
        res.render('success', { title: '¡Gracias por tu mensaje!', page: 'success' });
    }
}
exports.default = PageController;
