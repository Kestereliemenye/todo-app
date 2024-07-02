require("dotenv").config()
const express = require("express")
const app = express()
const jwt = require("jsonwebtoken")

function authToken(req, res, next) {
    
    const authHeader = req.headers["authorization"]
    // to check the token
    const token = authHeader && authHeader.split(" ")[1]
    if(token == null) return res.sendStatus(401)
    // we know there is token to verify
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}





app.use(express.json())
const posts = [
    {
        username: "kester",
        title: "post 1"
    },
     {
        username: "simdi",
        title: "post 2"
    }
]


app.get("/posts", authToken,(req, res) => {
    res.json(posts.filter (post => post.username === req.user.name))
})

app.post("/login", (req, res) => {
    // auth user
    const username = req.body.username
    const user = { name: username }
    // TO CREATE TOKEN
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({accesstoken: accessToken})

})









app.listen(6001)