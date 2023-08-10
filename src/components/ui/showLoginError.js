export const showLoginError = (error) => {
    const elemU = document.getElementById('loginError')
    const elemP = document.getElementById('passerror')
    elemP.classList.remove('active')
    elemU.classList.remove('active')
    if (error.code === 'auth/wrong-password') {
        elemP.classList.add('active')
    } else if (error.code === 'auth/user-not-found') {
        elemU.classList.add('active')
    }

}