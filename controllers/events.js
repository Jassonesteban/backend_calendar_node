const express = require('express');
const Event = require('../models/Event');


const getEvents = async(req, res = express.response) => {
    const events = await Event.find().populate('user', 'name email');

    res.status(200).json({
        ok: true,
        events
    });

}
const createEvent = async(req, res = express.response) => {

    const event = new Event(req.body);

    try {

        event.user = req.uid;

        const eventoGuardado = await event.save();
        res.status(201).json({
            ok: true,
            msg: 'evento guardado',
            eventoGuardado
        })


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error interno',
            error
        })
    }

}
const updateEvent = async(req, res = express.response) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {
        const event = await Event.findById(eventId);

        if(!event) {
            return res.status(404).json({
                ok: false,
                msg: 'No exite el evento'
            })
        }


        if(event.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios de editar este evento'
            });
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const eventUpdate = await Event.findByIdAndUpdate(eventId, newEvent, {new: true});

        res.json({
            ok: true,
            eventUpdate
        })


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error interno'
        })
    }

}
const deleteEvent = async(req, res = express.response) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {
        const event = await Event.findById(eventId);

        if(!event) {
            return res.status(404).json({
                ok: false,
                msg: 'No exite el evento'
            })
        }


        if(event.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios de eliminar este evento'
            });
        }

        await Event.findByIdAndDelete(eventId);

        res.json({
            ok: true,
            msg: 'EVENTO ELIMINADO'
        });


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error interno'
        })
    }

}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}