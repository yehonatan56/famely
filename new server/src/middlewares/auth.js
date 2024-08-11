const isAuth = (req,res,next) => {
    if (req.isAuthenticated()){
        res.status(200).send('ok')
    }else {
        res.status(404).send('no')
    }
}
module.exports = isAuth;