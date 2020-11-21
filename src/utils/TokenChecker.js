import jwt_decode from "jwt-decode";

const tokenChecker = () => {
    const token = localStorage.getItem("token")
    if(token) {
        var decoded = jwt_decode(localStorage.getItem("token"));
        if (Date.now() >= decoded.exp * 1000) {
            localStorage.clear()
            return false;
        }
        return true;
    }
    return false
}

export default tokenChecker