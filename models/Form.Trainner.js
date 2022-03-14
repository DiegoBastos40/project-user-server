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
  type:String, min:0,
 
 },

 workoutSessionTime:{
  type:String, min:0,
 
 },

 injuries:{
   hasInjuries:{
     type:String
   },
  injuriesDetails:{
    type:String
  }

 },

 drink:{
  type:String
  
 },

 smoke:{
  type:String
  
 },

 workedoutBefore:{
  type:String
  
 },

 dietType:{
  type:String
  
 },

 supplements:{
  type:String
  
 }
    
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Personal = model("Personal", ptFormSchema);

module.exports = Personal;
