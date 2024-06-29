// importing libiaries
const express = require("express")
const bcrypt = require("bcrypt")
const bodyParser = require("body-parser")
const path = require("path")
//impoting sessions libiary
const session = require("express-session")
const {store , userAuthentication, Task, Collection} = require("./configuration");
const { log, error } = require("console")
const { name } = require("ejs")
// const { create } = require("domain")








const app = express()
app.use(session({
    secret: "key that will sign d cookie (string)",// a key that will sign the cookie
    resave: false, //we said no to not specifying d user request to d browser
    saveUninitialized: false,// saying no to the session is we have not modified or touched d session dont save
    store:store
}))
app.use(express.json())
app.use(express.static("public")) // to use the public dir
// takes the values of the form 
app.use(express.urlencoded({ extended: false }))
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// to auth a user to access the home page
const isAuth = (req, res, next) => {
    if (req.session.isAuth) {
        next()
    } else {
        res.redirect("/login")
    }
}


app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
const PORT = 6004











//Routes
app.get("/", (req, res) => {
    res.render("index")
})
app.get("/signup", (req, res) => {
    res.render("signup")
})
app.get("/login", (req, res) => {
    res.render("login")
})
app.get("/home", isAuth,(req, res) => {
    const username = req.query.username;
    res.render("home", {username: username})
})

// CRUD FOR TASKS
//post route to create

app.post("/home/task", async (req, res) => {
    const { title, details, usage } = req.body;
    console.log({title, details, usage})
    if (!title || !details || !usage) {
        return res.status(400).send("Missing required fields")
    }
    const newTask = new Task({
        title,
        details,
        usage
    }) 
    try {
        const savedTask = await newTask.save() // creates a nerw task from the  from d req
        res.status(201).json(savedTask)
    } catch (error) {
        res.status(500).send(error)
    }
})
// to display all task according to user
// app.get("/home/tasks/:userid", async (req, res) => {
//     try {
//         const tasks = await Task.find({UserID:req.params.userid});
//         res.json(tasks)
//         console.log(tasks);
//     } catch (error){
//         res.status(500).json({error: error.message})
//    }
// })
app.get("/home?username", async (req, res) => {
    try {
        const { username } = req.query
        const user = await userAuthentication.findOne({username})
         if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        console.log(user);
        
    } catch (error) {
        console.log(error);
    }
})
// to delete task
app.delete("/home/tasks/:taskid", async (req, res) => {
    const taskID = req.params.taskid
    try {
            const deletedTask = await Task.findByIdAndDelete(taskID)
        if (!deletedTask) {
                return res.status(404).send("Task not found")
        }
            res.json({message:"Task deleted succesfully"})
    } catch (error) {
        res.status(500).send(error.message)
        }   
})

// to update/edit a task
app.put("/home/tasks/:taskid", async (req, res) => {
    const { taskid } = req.params
    const {title, details, usage} = req.body
    try {
        const updateTask = await Task.findByIdAndUpdate(taskID, {
            title,
            details,
            usage
        }, { new: true })// it is to return the updated document
        if (!updateTask) {
            return res.status(404).send("Task not found")
        }
        res.json(updateTask)// responds with updated task
    } catch (error) {
        res.status(500).send(error.message)
    }
})






// For collection
app.post("/home/collection", async (req, res) => {
 const { title, details, usage , subtask} = req.body;
    console.log({title, details, usage, subtask})
    if (!title || !details || !usage || !subtask) {
        return res.status(400).send("Missing required fields")
    }
    const newColl = new Collection({
        title,
        details,
        usage,
        subtask
    }) 
    try {
        const savedColl = await newColl.save() // creates a nerw task from the  from d req
        res.status(201).json(savedColl)
    } catch (error) {
        res.status(500).send(error)
    }
})

// to get task 
app.get("/home/collection", async (req, res) => {
try {
        const collection = await Collection.find();
        res.json(collection)
    } catch (error){
        res.status(500).json({error: error.message})
   }
})

// to delete task
app.delete("/home/collection/:taskid", async (req, res) => {
 const taskID = req.params.taskid
    try {
            const deletedTask = await  Collection.findByIdAndDelete(taskID)
        if (!deletedTask) {
                return res.status(404).send("Task not found")
        }
            res.json({message:"Task deleted succesfully"})
    } catch (error) {
        res.status(500).send(error.message)
        }  
})
















// TO register a user
app.post("/signup", async (req, res) => {
    const data = {
        //this will be sent to datbase
        name: req.body.name,
        password: req.body.password
    }

    //check if it already exists in database
    const existingUser = await userAuthentication.findOne({ name: data.name })
    if (existingUser) {
        res.status(400).json({message:"username already exists"})
    }
    else {
        try {
            // to hash password
            const saltRounds = 10;

            const hashedPassword = await bcrypt.hash(data.password, saltRounds)

            // replace password with hashed passowrd 
            data.password = hashedPassword


            // send data to database
            await userAuthentication.create(data);
            
        }
        catch (error) {
            console.log("error", error);
            res.status(500).render("signup", {message: "Internal server error"})
        }
        
         res.status(201).render("index2",{message:"User successfully registered"})
    }
})







// to log a user
app.post("/login", async (req, res) => {
    try {
        const user = await userAuthentication.findOne({ name: req.body.name })
        if (user) {
            // check is passsword is correct
            const ifPasswordMatch = await bcrypt.compare(req.body.password, user.password)
            if (ifPasswordMatch) {
                req.session.isAuth = true// set  d session
                res.redirect(`/home?username=${encodeURIComponent(user.name)}`)
            } else {
                res.status(400).render("login", {message:"incorrect password"})
            }
        } else {
            res.status(404).render("login",{message: "User not found"})
        }
    } catch (error) {
        console.error("Error", error)
        res.status(500).send("Internal server error")
    }
})









// to logout a user
app.post("/logout", (req, res) =>{
    req.session.destroy((err) => { // destoy takes a callback
        if (err) throw err;
        res.redirect("/")
    })
    
})










 





app.listen(`${PORT}`, () => {
    console.log("server is live");
})