// to create database connection
const mongoose = require("mongoose")


//to save the session in mongoDB
const session = require("express-session")
const mongodbSession = require("connect-mongodb-session")(session)
const mongoURI = "mongodb+srv://user1:Kester0900@cluster0.o18qx92.mongodb.net/Todo-app-users?retryWrites=true&w=majority&appName=Cluster0"

//connect it to database
const connect = mongoose.connect(mongoURI)

// to check for successful connection
connect.then(() => {
    console.log("Database connected");
}).catch(() => {
    console.log("Database not connected");
})
// to save the session to mongodb
const store = new mongodbSession({
    uri: mongoURI,
    // name the session
    collection:"mySessions",

})


//create a shcema
const loginSchema = new mongoose.Schema({
    // we need just name and password
    name: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true
    }
})

// create a model
const userAuthentication = new mongoose.model(
    //the namae of the collection and shema
    "users", loginSchema
)

// FOR TASK
//task schema
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    details: {
        type: String,
        required:true

    },
    usage: {
        type: String,
        required:true
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    }
    
})
// task model
const Task = mongoose.model(
    "Task", taskSchema
)
// collectioin schema 
const collSchema = new mongoose.Schema({
     title: {
        type: String,
        required:true
    },
    details: {
        type: String,
        required:true

    },
    usage: {
        type: String,
        required:true
    },
    subtask: {
        type: String,
        required:true
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
})
// coll model
const Collection = new mongoose.model(
    "Collection", collSchema
)






//export
module.exports ={ userAuthentication , store, Task, Collection};