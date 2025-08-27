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

// CORS configuration for Render
app.use(cors({
    origin: ['https://codenexa.onrender.com'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    exposedHeaders: ['Set-Cookie']
}));

// Handle preflight requests explicitly
app.options('*', cors({
    origin: 'https://codenexa.onrender.com',
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Debug middleware (remove in production)
app.use((req, res, next) => {
    if (req.path.includes('/user') || req.path.includes('/problem')) {
        console.log(`${req.method} ${req.path} - Origin: ${req.headers.origin}`);
        console.log('Cookies:', Object.keys(req.cookies));
    }
    next();
});

app.use('/user',authRouter);
app.use('/problem',problemRouter);
app.use('/submission',submitRouter);
app.use('/ai',aiRouter);
app.use("/video",videoRouter);

app.get('/' ,(req,res)=>{
    res.json({
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
            console.log("Environment:", process.env.NODE_ENV || 'development');
        })
    }
    catch(err){
        console.log("Error: "+err);
    }
}

InitalizeConnection();