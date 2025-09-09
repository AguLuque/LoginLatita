// backend/server.js
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const path = require('path');

const JWT_SECRET = 'tu-secreto-super-secreto';

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(403).json({ message: 'Se requiere un token de autenticación' });
    }
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token no válido o expirado' });
    }
};

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const users = [{ email: 'admin@gmail.com', password: '123456' }];

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

app.get('/api/protected-data', verifyToken, (req, res) => {
    res.json({
        message: `¡Bienvenido, ${req.user.email}!`,
        data: 'Esto es información secreta.'
    });
});

// 👉 Servir el frontend de Vite (dist en la raíz de LoginLatita)
app.use(express.static(path.join(__dirname, '../dist')));

// 👉 Fallback para React Router
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

// Escuchar en 0.0.0.0 para acceso externo
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor escuchando en http://0.0.0.0:${PORT}`);
});
