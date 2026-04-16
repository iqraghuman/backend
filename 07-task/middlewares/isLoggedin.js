import jwt from "jsonwebtoken"

const isLoggedin = (req, res, next) => {


    const token = req.cookies.userToken || req.cookies.adminToken

    console.log(token);



    if (!token) {
        res.status(400).json({
            message: "unauthorized User"
        })
    }
    try {

        const decode = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decode

        next()

    } catch (error) {
        res.status(500).json({
            message: "Something went Wrong"
        })
    }
}

export default isLoggedin