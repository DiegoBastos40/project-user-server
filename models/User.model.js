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
caloriesWasted: {type:Number} ,
foodCreated: [{ type: Schema.Types.ObjectId, ref: 'Food' }],
ptRequest: [{type: Schema.Types.ObjectId, ref: 'Personal'}],
   name:  {type:String},
   age: {type:Number},
   gender: {type:String},
   height: {type:Number},
   weight: {type:Number},
   objective: {type:String},
   lifestyle: {type:String},
   totalCalories: {type:Number},

  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;

