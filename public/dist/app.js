"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser")); // Para parsear los datos del formulario
const routes_1 = __importDefault(require("./routes")); // Importa las rutas correctamente
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3000;
// Configurar el motor de plantillas EJS
app.set('view engine', 'ejs');
// Configurar la carpeta donde se encuentran las vistas EJS
app.set('views', path_1.default.join('src', 'views')); // Cambiar si tus vistas están en una carpeta diferente
// Configurar la ruta para los archivos estáticos en 'public'
app.use(express_1.default.static(path_1.default.join('public')));
// Middleware para parsear los datos del formulario
app.use(body_parser_1.default.urlencoded({ extended: true })); // Asegúrate de que esté configurado
app.use(body_parser_1.default.json()); // Este es para JSON
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));
// Configuración de las rutas
app.use('/', routes_1.default);
// Configuración de las sesiones
app.use((0, express_session_1.default)({
    secret: 'fas5zr23rdrt5yt6wqsded58zd24',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Si estás usando https, cambia esto a true
}));
// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
