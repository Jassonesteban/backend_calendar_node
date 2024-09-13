const express = require('express');
const { validationResult } = require('express-validator');

const crearUser = (req, res = express.response) => {

    const { name, email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    res.status(201).json({
        ok: true,
        msg: 'registro',
        name,
        email,
        password
    });
}

const loginUser = (req, res = express.response) => {

    const { email, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    res.status(201).json({
        ok: true,
        msg: 'login de usuario',
        name,
        email,
        password
    });
}

const revalidateToken = (req, res = express.response) => {
    res.json({
        ok: true,
        msg: 'validate token'
    });
}


module.exports = { crearUser, loginUser, revalidateToken };