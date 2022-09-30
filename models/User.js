const mongoose= require ("mongoose");
const schema=mongoose.Schema
const UserSchema=new schema({
  name:{type:String, required:true
   
  },
  lastName:{type:String, required:true
   
  },
  email:{type:String, required:true
   
  },
  password:{type:String, required:true
   
  },
  category:{type:String, default:"user"}

})

const User = mongoose.model('User', UserSchema);


module.exports=User
