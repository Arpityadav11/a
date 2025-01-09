const express = require("express");
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const methodOverride = require("method-override");

const Chat = require("./models/chat.js")

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

main()
.then(()=>{
    console.log("connection successful");
})
.catch((err) => console.log(err));

async function main() {
     await mongoose.connect('mongodb://127.0.0.1:27017/ChatApp');
}
// index Route
app.get("/chats",async (req,res)=>{
    let chats = await Chat.find();
    res.render("index.ejs",{chats});
});

app.get("/chats/new",(req,res)=>{
    res.render("newChat.ejs");
})

// Create route
app.post("/chats",(req,res)=>{
    let {from,to,msg} = req.body;
    let newChat =new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at:new Date()
    });
    newChat
    .save()
    .then((res)=>{
        console.log("chat saved");
    })
    .catch((err)=>{
        console.log(err);
    });
    res.redirect("/chats");
})

app.get("/chats/:id/edit", async (req, res) =>{
    let { id } = req.params; 
    let chat = await Chat.findById(id); 
    res.render("edit.ejs", { chat }); 
});

app.put("/chats/:id",async (req,res)=>{
    let {id}=req.params;
    let { msg: newMsg}=req.body;
    let updatedChat = await Chat.findByIdAndUpdate(id,
        {msg:newMsg},
        {runValidator:true,new:true}
    );

    console.log(updatedChat);
    res.redirect("/chats");
});

app.delete("/chats/:id",async (req,res)=>{
    let { id } = req.params;
    let deletedchat = await Chat.findByIdAndDelete(id);
    console.log(deletedchat);
    res.redirect("/chats");
})
 
app.get("/",(req,res)=>{
    res.render("home.ejs");
})

app.listen(8080,()=>{
    console.log("app is listening to port:8080");
});