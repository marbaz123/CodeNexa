const express = require('express')
const app = express();
require('dotenv').config();
const main =  require('./config/db')
const cookieParser =  require('cookie-parser');
const authRouter = require("./routes/userAuth");
const redisClient = require('./config/redis');
const problemRouter = require("./routes/problemCreator");
const submitRouter = require("./routes/submit")
const aiRouter = require("./routes/aiChatting")
const videoRouter = require("./routes/videoCreator");
const cors = require('cors')
const port = process.env.PORT || 3000;

app.set("trust proxy", 1);

app.use(cors({
  origin: ['http://localhost:5173', 'https://codenexa.vercel.app'],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/user',authRouter);
app.use('/problem',problemRouter);
app.use('/submission',submitRouter);
app.use('/ai',aiRouter);
app.use("/video",videoRouter);

app.get('/' ,(req,res)=>{
    res.send({
        activeStatus:true,
        error:false,
    })
})


const InitalizeConnection = async ()=>{
    try{

        await Promise.all([main(),redisClient.connect()]);
        console.log("DB Connected");
        
        app.listen(port, ()=>{
            console.log("Server listening at port number: "+ port);
        })

    }
    catch(err){
        console.log("Error: "+err);
    }
}


InitalizeConnection();

