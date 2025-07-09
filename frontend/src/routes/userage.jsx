import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/userage')({
  beforeLoad: () => {
    const accessToken = sessionStorage.getItem("emailtoken");
    if (!accessToken) {
      return redirect({ to: '/login' });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAge = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setWorkouts([]);

    if (!age || Number(age) <= 17) {
      setError("Age must be greater than 17");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/users/userage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
          credentials: "include",
        body: JSON.stringify({ age: Number(age) }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "No workout found.");
        return;
      }

      setWorkouts(data.workouts || []); 
      setIsSubmitted(true); 
      
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setAge("");
    setError(null);
    setWorkouts([]);
    setIsSubmitted(false); // ✅ Show form again
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && error && <p style={{ color: "red" }}>{error}</p>}

      {!isSubmitted && (
        <div className="Age-container">
          <form onSubmit={handleAge}>
            <div className="Age-no">
              <label className="Age-label" htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter your Age"
                required
              />
            </div>
            <div className="Age-no">
              <button className="Age-button" type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      )}

      {isSubmitted && (
        <div className="workout-container">
          <button className="workout-reset-button" type="button" onClick={handleReset}>
            Reset
          </button>
          <h1 className="workout-title">Workout Details</h1>
          {workouts.map((workout, index) => (
            <div className="workout-card" key={index}>
              <h2 className="workout-day">Day - {workout.Day}</h2>
              <h2 className="workout-muscle">Muscle Group - {workout.Workout_details}</h2>
              <h3 className="workout-exercises-heading">Exercises</h3>
              <p className="workout-exercise">Exercise 1: {workout.Workout1}</p>
              <p className="workout-exercise">Exercise 2: {workout.Workout2}</p>
              <p className="workout-exercise"> Exercise 3: {workout.Workout3}</p>
              <p className="workout-exercise">Exercise 4: {workout.Workout4}</p>
              <hr className="workout-divider"  />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
