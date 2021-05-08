import { createContext } from 'react'

// Default object contexts
const authContext = createContext({
    user: nulll, 
    login: () => {}, 
    logout: () => {}, 
    authReady: false
})

export const authContextProvider = ( { children }) => { // wraps my entire application for logins


    return (
        <authContext.Provider value="">
            { childern }
        </authContext.Provider>
    )
}



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