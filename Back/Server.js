// backend/server.js

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

// Clave secreta: ¡Defínela una sola vez!
const JWT_SECRET = 'tu-secreto-super-secreto';

// Middleware para verificar el token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(403).json({ message: 'Se requiere un token de autenticación' });
    }
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Agrega la información del usuario a la solicitud
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token no válido o expirado' });
    }
};

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// **IMPORTANTE: En una aplicación real, no harías esto. Esto es solo para propósitos de prueba.**
const users = [
    { email: 'admin@gmail.com', password: '123456' }
];

// Ruta para el inicio de sesión
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
});

// Ruta protegida que usa el middleware para verificar el token
app.get('/api/protected-data', verifyToken, (req, res) => {
    res.json({
        message: `¡Bienvenido, ${req.user.email}!`,
        data: 'Esto es información secreta.'
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor escuchando en http://0.0.0.0:${PORT}`);
});
