import jwtDecode from 'jwt-decode';

export const authenticate = (token, cb) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(token));
        cb();
    }
}

export const isAuthenticated = () => {
    if (typeof window !== 'undefined') {       
        if (localStorage.getItem('jwt')) {
            const {exp} = jwtDecode(JSON.parse(localStorage.getItem('jwt')));
            if (new Date().getTime() <= exp * 1000) {
                return true;
            } else {
                localStorage.removeItem('jwt');
                return false;
            }
        } else {
            return false;
        } 
    } 
}

export const userInfo = () => {
    const jwt = JSON.parse(localStorage.getItem('jwt'));
    const decoded = jwtDecode(jwt);
    return {...decoded, token: jwt};
}

export const signOut = cb => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('jwt');
        cb();
    } 
}