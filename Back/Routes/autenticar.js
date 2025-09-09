// backend/routes/auth.js

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Clave secreta para firmar los tokens JWT
const JWT_SECRET = 'tu_clave_secreta_super_segura_y_larga';

// Base de datos de prueba
const users = [
    {
        id: 1,
        email: 'admin@gmail.com',
        password: '$2b$10$8/qAwpD8.lB4TaOMYqpHr.laGIkAZCc/iZAbS/wVh1VBWMdTB8vS2'
    }
];

// Ruta para el inicio de sesión
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);

    if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(400).json({ message: 'Usuario o contraseña incorrectos.' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

module.exports = router;

