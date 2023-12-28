const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./Routers/authRouter')
const courseRouter = require('./Routers/courseRouter')
const topicRouter = require('./Routers/topicRouter')
var cors = require('cors')

const PORT = process.env.PORT || 3001

const app = express();

app.use(cors())
app.use(express.json());
app.use("/auth", authRouter);
app.use("/courses", courseRouter);
app.use("/topics", topicRouter);

const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://veronikapr777:mqiSL7jcUSlk86mu@cluster0.xppqaad.mongodb.net/CatTrain?retryWrites=true&w=majority`)
        
        app.listen(PORT, () => {
            console.log(`Server starting on port ${PORT}`)
        });
    } catch (error) {
        
    }
}

start();
