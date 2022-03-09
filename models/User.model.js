const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      required:true
      // unique: true -> Ideally, should be unique, but its up to you
    },
    password: {type:String,
    required:true},
/*     Age:{type:Number,
      required:true
    },
    Height:{type:Number,
    required:true},

    Weight:{type:Number,
    required:true},

    Objective:{
      type:String,
      required:true,
      enum:['Lose Fat','Build Mass']
       },
LifeStyke:{
  type:String,
  required:true,
  enum:['Sedentay','Light Active','Moderately Active','Very Active','Extra Active']
} */
    
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
