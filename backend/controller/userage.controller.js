import Workout from "../model/workout.model.js";
const userage = async (req, res) => {
  const { age } = req.body;
  let userage = age;

  try {
    if (userage <= 17) {
      return res.status(400).json({
        message: "Age should be greater than 17",
      });
    }

    if (userage >= 18 && userage <= 25) {
      userage = 20;
    }

    if (userage >= 26) {
      userage = 30;
    }

    const workouts = await Workout.find({ age: userage });

  if (!workouts || workouts.length === 0) {
  return res.status(404).json({
    message: "No workouts found for this age group.",
  });
}

    return res.status(200).json({
      message: "Here is your Workout details",
      workouts, // send actual data
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export default userage