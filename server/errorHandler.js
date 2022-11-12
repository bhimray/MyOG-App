const clientError = error => new Error(JSON.stringify({
    success:false,
    code:400,
    error
}))

const serverError = ({ name, message, stack })=> new Error(JSON.stringify({
    success:false,
    error:"Server Error",
    code:500,
    name,
    message,
    stack
}))

const userValidationError = err =>{
    if (err.name === "ValidationError") return clientError(Object.values(err.errors).map(({message})=>message));
    return serverError(err);
}

module.exports = {
    clientError,
    serverError,
    userValidationError
}
