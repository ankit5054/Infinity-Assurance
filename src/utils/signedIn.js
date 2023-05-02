export function signIn(setSignedIn,name) {
    window.signedIn = true;
    window.signedInAs = name;
    setSignedIn(true)
}
export function IsSignedIn(type) {
    if(window.signedInAs==="employee1" && type==="admin"){
        return true
    }
    else if(window.signedInAs==="customer" && type==="customer"){
        return true
    }
    else if(window.signedInAs==="employee2" && type==="employee"){
        return true
    }
}

export function logout(setSignedIn) {
    window.signedIn = false;
    window.usertype = "N/A"
    window.signedInAs = "";
    setSignedIn(false)
}
