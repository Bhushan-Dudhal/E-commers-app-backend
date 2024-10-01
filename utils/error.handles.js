

export const errorHandlers = (statuscode, message) => {
    const error = new Error();

    error.message = message;
    error.statuscode = statuscode;

    return error
}