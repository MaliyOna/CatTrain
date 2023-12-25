const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./authRouter')
const courseRouter = require('./courseRouter')
var cors = require('cors')

const PORT = process.env.PORT || 3001

const app = express();

app.use(cors())
app.use(express.json());
app.use("/auth", authRouter);
app.use("/courses", courseRouter)

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

// app.use(express.json());
// app.use("/auth", authRouter);

// app.listen(PORT, () => {
//     console.log(`Server starting on port ${PORT}`)
// })

// app.get('/api', (req, res) => {
//     res.json({
//         message: "Hello from backend"
//     });
// });