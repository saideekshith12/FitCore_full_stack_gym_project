import mongoose from "mongoose";


const WorkoutSchema = new mongoose.Schema({
  Day: {
    required: true,
    type: String,
  },
  age:{
    type:Number,
    required:true
  },
  Workout_details:{
    type:String,
    required:true
  },
  Workout1:{
     type:String,
     required:true

  },
    Workout2:{
     type:String,
     required:true

  },
    Workout3:{
     type:String,
     required:true

  },
    Workout4:{
     type:String,
     required:true

  },
},{
    timestamps:true
});


const Workout = mongoose.model("Workout", WorkoutSchema);

export default Workout;
