import jwt from "jsonwebtoken"

const isLoggedin = (req, res, next) => {
    const token = req.cookies.token

    console.log(token);


    if (!token) {
        res.status(400).json({
            message: "Unauthorized"
        })
    }

    try {

        const decode = jwt.verify(token, process.env.JWT_SECRET)

        console.log(decode);


        req.user = decode

        console.log(req);


        next()

    } catch (error) {
        res.status(400).json({
            message: "Invalid Credentails",
            error
        })
    }
}

export { isLoggedin }