module.exports = (req,res,next) => {

    if(req.cookies.userKitchening){
        req.session.userLogged = req.cookies.userKitchening;
    }

    if(req.session.userLogged){
        res.locals.userLogged = req.session.userLogged;
    }
    next();
}