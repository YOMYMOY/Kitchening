const router = require('express').Router();

const { index, formChef, addChef, formCourse, addCourse, detail, formEditCourse, editCourse } = require('../controllers/coursesController');
const { uploadCourseImage, uploadChefImage } = require('../middlewares/uploadImage');


/* /courses */

router
    .get('/',index)

    .get('/add', formCourse)
    .post('/add', uploadCourseImage.fields([{name : 'a'}, {name : 'b'}, {name : 'c'}, {name : 'd'}, {name : 'e'}, {name : 'f'}, {name : 'g'}]), addCourse)

    .get('/:id', detail)
    .get('/:id/edit', formEditCourse)
    .put('/:id/edit', editCourse)

    .get('/chef/add', formChef)
    .post('/chef/add', uploadChefImage.single('image'), addChef)

    .get('/products')


module.exports = router;