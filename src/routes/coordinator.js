export const goToLogin = (navigate) => {
    navigate("/")
}

export const goToSignup = (navigate) => {
    navigate("/Signup")
}

export const goToCommentary = (navigate, id) => {
    navigate(`/commentary/${id}`)
}

export const goToPosts = (navigate) => {
    navigate("/posts")
}