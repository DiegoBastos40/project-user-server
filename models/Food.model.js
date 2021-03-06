const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const foodSchema = new Schema(
  {
    name: {
      type: String,
      required:true
      // unique: true -> Ideally, should be unique, but its up to you
    },
    
    calories:{type:Number, min:0,
      //required:true
    },
    protein:{type:Number, min:0,},
    //required:true},

    carbohydrates:{type:Number, min:0,},
    //required:true},

    fat:{
    type:Number, min:0,
    //required:true 
       
},
  quantity:{
  type:Number, min:0,
  //required:true
 },
 meal: String
    
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Food = model("Food", foodSchema);

module.exports = Food;
