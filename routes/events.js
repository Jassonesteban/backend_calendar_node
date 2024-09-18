//obtener eventos
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validarJWT');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const { isDate } = require('../helpers/isDate');


const router = Router();

router.use(validarJWT);

//obtener eventos
router.get('/get', getEvents);

//crear evento
router.post('/create', [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio debe ser valida').custom(isDate),
    check('end', 'Fecha de fin debe ser valida').custom(isDate),
    validarCampos
],
    createEvent);

//actualizar evento
router.put('/:id', updateEvent);

//delete evento
router.delete('/:id', deleteEvent);

module.exports = router;

