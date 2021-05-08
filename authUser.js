// This function simply authenticates if a user exists

function authUser(req, res, next) {
    if (req.user == null) {
        res.status(403)
        return ress.send('You need to sign in')
    }
}

export default {
    authUser
}