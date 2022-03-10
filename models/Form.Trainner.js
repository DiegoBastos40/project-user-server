const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const ptFormSchema = new Schema(
  {
    name: {
      type: String,
     
      // unique: true -> Ideally, should be unique, but its up to you
    },
    
    email: {
      type: String,
     
      // unique: true -> Ideally, should be unique, but its up to you
    },
    
    typeOfWorkout:{type:String,
     
    },
    
  workoutFrequency:{
  type:Number, min:0,
 
 },

 workoutSessionTime:{
  type:Number, min:0,
 
 },

 injuries:{
   hasInjuries:{
     type:Boolean
   },
  injuriesDetails:{
    type:String
  }

 },

 drink:{
  type:Boolean
  
 },

 smoke:{
  type:Boolean
  
 },

 workedoutBefore:{
  type:Boolean
  
 },

 dietType:{
  type:String
  
 },

 supplements:{
  type:Boolean
  
 }
    
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const PtForm = model("PtForm", userSchema);

module.exports = User;
