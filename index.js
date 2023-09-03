const express =require("express");

const isPrime = require("prime-number")
const {numbers} = require("../124015128/Data/data.json")
// const userRouter=require("./routes/number.js");
const app=express();
const port=8080;
app.use(express.json());
// check for server
app.get("/",(req,res)=>{
    res.send("Server is Up and Working now!")
    // res.status(200).json({
    //     message:"Server is Up and Working now!"
    // });
});


app.get("/prime",(req,res)=>{
    const {data}=req.body;
    

    const prime=data.map((each)=>{
        if(isPrime(each)){
            return{
                ...each,
            };
        }
        return each;
    });
    return res.status(200).json({
        success:true,
        data:prime,
    });
});



app.get("*",(req,res)=>{
    res.send("Oopss...There no Route now!")
    // res.status(404).json({
    //     message:"Oopss...There no Route now!",
    // });
});

app.listen(port,()=>{
    console.log(`Server is Running in the port ${port}`);
});