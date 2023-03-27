const {readJSON, writeJSON} = require('../data/data');
const {validationResult} = require('express-validator');

module.exports = {
    index : (req,res) => {
        const courses = readJSON('courses.json');
        return res.render('courses/courses', {
            courses
        });
    },
    detail : (req,res) => {
        const courses = readJSON('courses.json');
        const {id} = req.params;
        const course = courses.find(course => course.id === +id)
        return res.render('courses/detail', {
            ...course
        });
    },
    formChef : (req,res) => {
        return res.render('courses/formChef');
    },
    addChef : (req,res) => {
        const chefs = readJSON('chefs.json');

        const newChef = {
            id : chefs.length ? chefs[chefs.length - 1].id + 1 : 1,
            name : req.body.name,
            image : req.file ? req.file.filename : null
        }

        chefs.push(newChef);
        writeJSON('chefs.json', chefs);
        return res.redirect('/courses')
    },
    formCourse : (req,res) => {
        const chefs = readJSON('chefs.json');
        return res.render('courses/formAddCourse', {
            chefs
        });
    },
    addCourse : (req,res) => {
        /* return res.send(req.files.b); */
        
        const courses = readJSON('courses.json');
        const {title, price, discount, description, chef, section} = req.body;
        const images = [];
        /* for(let i=97; i<104; i++){ */

        /* }; */

        req.files.a ? images.push(req.files.a[0].filename) : null;
        req.files.b ? images.push(req.files.b[0].filename) : null;
        req.files.c ? images.push(req.files.c[0].filename) : null;
        req.files.d ? images.push(req.files.d[0].filename) : null;
        req.files.e ? images.push(req.files.e[0].filename) : null;
        req.files.f ? images.push(req.files.f[0].filename) : null;
        req.files.g ? images.push(req.files.g[0].filename) : null;

        const chefs = readJSON('chefs.json');
        const prof = chefs.find(prof => prof.name === chef);

        const newCourse = {
            id : courses.length ? courses[courses.length - 1].id + 1 : 1,
            title : title,
            price : +price,
            discount : +discount,
            description : description,
            chef : chef,
            imageChef : prof && prof.image ? prof.image : null,
            section,
            images,
        };

        courses.push(newCourse);

        writeJSON('courses.json', courses);
        return res.redirect('/courses')
    },
    formEditCourse : (req,res) => {
        return res.render('courses/formEditCourse');
    },
    editCourse : (req,res) => {
        return res.send(req.body);
    }
}