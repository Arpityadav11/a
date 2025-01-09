const mongoose = require("mongoose");
const Chat = require("./models/chat");

main()
.then(()=>{
    console.log("connection successful");
})
.catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/ChatApp');
}

let allChats =[
    {
        from : "aadesh ",
        to:"om",
        msg:"clg aayega",
        created_at : new Date(),    
    },
    {
        from : "aadesh",
        to:"arpit",
        msg:"freshers a kya h ",
        created_at : new Date(),    
    },
    {
        from : "mohit",
        to:"gopal",
        msg:"kal chlna h classes M ",
        created_at : new Date(),    
    },
    {
        from : "gopal J",
        to:"mohit",
        msg:"khana unlimited rhega naa",
        created_at : new Date(),    
    },
    {
        from : "hemant",
        to:"chandan",
        msg:"ek kaam krte dal bati rkh lete h ",
        created_at : new Date(),    
    }
]

Chat.insertMany(allChats);