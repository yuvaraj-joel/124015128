const express=require("express");
const { trains } =require("../Tranin Management/Data/train.json");

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



// Route:/train
// Method:GET
// Description:Get train
// Access:public
// Paramenter:none

app.get('/trains',(req,res)=>{
    res.status(200).json({
        success:true,
        data:trains
    });
});


/*
Route:/trains
Method:GET
Description:Get the user
Access:public
Paramenter:id
*/




app.get("/trains/:id",(req,res)=>{
    const {id}=req.params;
    // console.log(id);
    const book = trains.find((each)=>each.id=== id);

    if (!book){
        res.status(404).json({
            success:false,
            message:"Name Not Found",
        });  
    }else {
      res.status(200).json({
            success:true,
            data:train,
        });

    }
});




/*
Route:/trains
Method:POST
Description:Create a new user
Access:public
Paramenter:none
*/



app.post("/trains",(req,res)=>{
    const {id,name,country,language,trainName,Price,Departure,Tickets}=req.body;
    const train=trains.find((each)=>each.id===id);
    if(train){
       return res.status(404).json({
            sucess:false,
            message:"Name Alread Exists"
        });
    }
        trains.push({
            id,
            name,
            country,
            language,
            trainName,
            Price,
            Departure,
            Tickets
        });

       return res.status(201).json({
            success:true,
            data:trains,
        });
    }
);

/*
Route:/trains/:id
Method:PUT
Description:Update a new name
Access:public
Paramenter:id
*/
app.put("/trains/:id",(req,res)=>{
    const {id}=req.params;
    const {data}=req.body;
    const train=trains.find((each)=>each.id===id)
    if(!book){
        return res.status(404).json({
            success:true,
            message:"name not Found"
        });
    }

    const updateUser=train.map((each)=>{
        if(each.id===id){
            return{
                ...each,
                ...data,
            };
        }
        return each;
    });
    return res.status(200).json({
        success:true,
        data:updateUser,
    });
});
/*
Route:/books/:id
Method:DELETE
Description:Deleting User By id
Access:public
Paramenter:id
*/

app.delete("/:id",(req,res)=>{
    const {id}=req.params;
    const train=trains.find((each)=>each.id=== id);
    if(!train){
        return res.status(404).json({
            success:false,
            message:"Name Not Found",
        })
    }

    const index=trains.indexOf(train);
    books.splice(index,1)
    return res.status(200).json({
        success:true,
        data:trains,
    })
})

app.get("*",(req,res)=>{
    res.send("Oopss...There no Route now!")
    // res.status(404).json({
    //     message:"Oopss...There no Route now!",
    // });
});

app.listen(port,()=>{
    console.log(`Server is Running in the port ${port}`);
});
