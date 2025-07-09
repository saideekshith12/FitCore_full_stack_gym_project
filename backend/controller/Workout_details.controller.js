import Workout from "../model/workout.model.js"

const Workout_deatils = async (req, res) => {
  const {
    Day,
    age,
    Workout_details,
    Workout1,
    Workout2,
    Workout3,
    Workout4,
  } = req.body;

  if (!Day || !age || !Workout_details || !Workout1 || !Workout2 || !Workout3 || !Workout4) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  try {
    const workouts = await Workout.create({
      Day,
      age,
      Workout_details,
      Workout1,
      Workout2,
      Workout3,
      Workout4,
    });

    return res.status(200).json({
      message: "Successfully added",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went Wrong",
      error: error.message,
    });
  }
};

export default Workout_deatils