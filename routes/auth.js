const express = require('express');
const router = express.Router(); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario'); 


router.post('/register', async (req, res) => {
    const { nombre, apellido, fecha_nacimiento, direccion, telefono, email, password } = req.body;

    try {
       
        let usuario = await Usuario.findOne({ where: { email } });
        if (usuario) {
            return res.status(400).json({ msg: 'Usuario ya existe' });
        }

  
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

   
        usuario = await Usuario.create({
            nombre,
            apellido,
            fecha_nacimiento,
            direccion,
            telefono,
            email,
            password: hashedPassword
        });

    
        const payload = {
            Usuario: {
                id: usuario.id
            }
        };

   
        jwt.sign(payload, 'secret', { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error al registrar usuario');
    }
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
     
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            return res.status(400).json({ msg: 'Usuario no encontrado' });
        }

   
        const isMatch = await bcrypt.compare(password, usuario.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Contraseña incorrecta' });
        }

        const payload = {
            Usuario: {
                id: usuario.id
            }
        };

   
        jwt.sign(payload, 'secret', { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
});

module.exports = router;
