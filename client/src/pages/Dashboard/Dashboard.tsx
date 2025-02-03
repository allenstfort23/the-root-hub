import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token"); // remove token
    navigate("/login");
  };
  return (
    <div>
      <h1>Welcome to Your Dashboard</h1>
      <p>You're successfully logg in!</p>
      <button onClick={handleLogOut}>Logout</button>
    </div>
  );
};

export default Dashboard;
