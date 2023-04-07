const {readJSON, writeJSON} = require("../data/data.js");
const {validationResult} = require('express-validator');
const {hashSync} = require('bcryptjs');
const User = require('../models/User');

module.exports = {
    formRegister : (req,res) => {
        return res.render('users/register');
    },
    register : (req,res) => {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.render('users/register', {
                errors : errors.mapped(),
                old : req.body
            });
        }

        User.create(req.body);

        return res.redirect('/users/login');
    },
    formLogin : (req,res) => {
        return res.render('users/login');
    },
    login : (req,res) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.render('users/login', {
                errors : errors.mapped()
            });
        }

        const userLogged = User.findByField('email', req.body.email);
        delete userLogged.password;
        req.session.userLogged = userLogged;

        if(req.body.remember){
            res.cookie('userKitchening', req.session.userLogged, {maxAge: 1000*60*2})
        }
            
        return res.redirect('profile');

        
        
    },
    profile : (req,res) => {
        console.log(req.cookies.userKitchening);
        return res.render('users/profile', {
            user : req.session.userLogged,
        });

    },
    logout : (req,res) => {
        res.clearCookie('userKitchening')
        req.session.destroy();
        return res.redirect('/')
    }

}