const multer = require('multer');
const path = require('path');

const storageCourseImage = multer.diskStorage({
    destination : (req,file,cb) => {
        const folder = path.resolve(__dirname, '..', 'public', 'images', 'courses');
        cb(null, folder);
    },
    filename : (req,file,cb) => {
        const imageName = `${Date.now()}_courses_${file.originalname}`;
        cb(null, imageName);
    }
});

const uploadCourseImage = multer({storage : storageCourseImage});

const storageChefImage = multer.diskStorage({
    destination : (req,file,cb) => {
        const folder = path.resolve(__dirname, '..', 'public', 'images', 'chefs');
        cb(null, folder);
    },
    filename : (req,file,cb) => {
        const imageName = `${Date.now()}_chefs_${file.originalname}`;
        cb(null, imageName);
    }
});

const uploadChefImage = multer({storage : storageChefImage});

module.exports = {
    uploadCourseImage,
    uploadChefImage
}