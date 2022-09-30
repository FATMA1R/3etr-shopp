const mongoose= require ("mongoose");
const schema=mongoose.Schema
const OrderSchema=new schema({

 imgUser:{type:String, required:true
   
  },
  nameUser:{type:String, required:true
   
  },
  nameProduct:{type:String, required:true
   
  },
  qte:{type:String, required:true
   
  },
  price:{type:String, required:true
   
  },
  date:{type:String, 
   
  },
  description:{type:String, required:true
   
  },

})
const Order = mongoose.model('Order', OrderSchema);


module.exports=Order