const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const { crearUser, loginUser, revalidateToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJWT');

router.post('/newUser', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'debe ser un email valido').isEmail(),
    check('password', 'La contraseña debe ser de 6 caracteres').isLength({ min: 6 }),
    validarCampos
], crearUser);

router.post('/login', [
    check('email', 'debe ser un email valido').isEmail(),
    check('password', 'La contraseña debe ser de 6 caracteres').isLength({ min: 6 }),
    validarCampos
], loginUser);

router.get('/validateToken', validarJWT, revalidateToken);


module.exports = router;