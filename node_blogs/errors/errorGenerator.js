const errorGenerator = ({ message, statusCode=500 }) => { // default = 500
    const error = new Error(message)
    error.statusCode = statusCode
    throw error
}

module.exports = errorGenerator