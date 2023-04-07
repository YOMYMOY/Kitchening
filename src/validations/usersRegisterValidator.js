const { body, check } = require('express-validator');
const {readJSON} = require('../data/data')

module.exports = [
    check('name')
        .notEmpty().withMessage('El nombre es obligatorio').bail()
        .isLength({min: 2, max: 30}).withMessage('Ingresa entre 2 y 30 caracteres').bail()
        .isAlpha('es-ES', {ignore: " "}).withMessage('Solo caracteres alfanuméricos'),

    check('surname')
        .notEmpty().withMessage('El apellido es obligatorio').bail()
        .isLength({min: 2, max: 30}).withMessage('Ingresa entre 2 y 30 caracteres').bail()
        .isAlpha('es-ES', {ignore: " "}).withMessage('Solo caracteres alfanuméricos'),

    body('email')
        .notEmpty().withMessage('El email es obligatorio').bail()
        .isEmail().withMessage('Ingrese un email válido').bail()
        .custom((value, {req}) => {
            let user = readJSON('users.json').find(user => user.email === value);
            return !user; //user ? false : true, si no existe usuario es undefined(false) y lo transforma a true
        }).withMessage('El email ya se encuentra registrado'),

    check('password')
        .notEmpty().withMessage('La contraseña es obligatoria').bail()
        .isLength({min: 6, max: 12}).withMessage('• Debe contener entre 6 y 12 caracteres'),

    body('confirmPassword')
        .notEmpty().withMessage('Debes confirmar tu contraseña').bail()
        .custom((value, {req}) => {
            if(value !== req.body.password ){
                return false;
            }
            return true;
        }).withMessage('Las contraseñas no coinciden'),
]