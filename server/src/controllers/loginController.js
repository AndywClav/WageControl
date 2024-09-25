const getLogin = (req, res) => {
    try {
        res.status(200).send("Hello When you into my web")
    } catch (error) {
        if (error.status >= 400 && error.status < 500) {
            res.status(error.status).send("Client Error - Not Found");
        } else if (error.status >= 500 && error.status < 600) {
            res.status(error.status).send("Server Error");
        } else {
            res.status(500).send("An unknown server error occurred");
        }
    }
}

export { getLogin }