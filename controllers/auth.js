const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const crearUser = async (req, res = express.response) => {

    const { email, password } = req.body;
    try {

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe'
            });
        }

        user = new User(req.body);

        //encriptar password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        const token = await generateJWT(user.id, user.name);

        res.status(201).json({
            ok: true,
            user,
            token
        });
    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Hubo un error interno'
        })
    }

}

const loginUser = async (req, res = express.response) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe'
            });
        }

        const validPassword = bcrypt.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales incorrectas'
            })
        }

        //generar jwt
        const token = await generateJWT(user.id, user.name);
        res.json({
            ok: true,
            user,
            token
        })


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error interno'
        })
    }
}

const revalidateToken = async (req, res = express.response) => {

    const {uid, name} = req;

    // generar nuevo jwt y enviarlo en esta nueva peticion
    const token = await generateJWT(uid, name);


    res.status(201).json({
        ok: true,
        uid,
        name,
        token
    });
}


module.exports = { crearUser, loginUser, revalidateToken };