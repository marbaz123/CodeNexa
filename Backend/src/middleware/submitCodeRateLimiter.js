const { error } = require('console');
const redisClient = require('../config/redis');

const submitCodeRateLimiter = async (req,res,next)=>{
    try{
        const userId = req.result._id;
        const rediskey = `submit_cooldown:${userId}`;

        const exists = await redisClient.exists(rediskey);

        if(exists){
            return res.status(429).json({
                error:'Please wait for 10 seconds before submitting again'
            });
        }

        await redisClient.set(rediskey,'cooldown_active',{
            EX:10, //expire after 10 seconds
            NX: true //only if not exists
        });

        next();
    }
    catch(err){
        res.status(500).json({error:"Server Error: "+err.message});
    }
}

module.exports = submitCodeRateLimiter;