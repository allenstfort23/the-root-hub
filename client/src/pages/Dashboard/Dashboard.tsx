import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../../utils/api";

interface DashboardProps {
  isAuthenticated: boolean;
  handleLogout: () => void;
}
const Dashboard = ({ isAuthenticated, handleLogout }: DashboardProps) => {
  const [user, setUser] = useState<{ id: number; username: string } | null>(
    null
  );
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const userData = await getUserProfile(token);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  return (
    <div className="p-5 mb-4 bg-body-tertiary rounded-3">
      <div className="container-fluid py-5">
        <h1 className="display-5 fw-bold">
          Welcome {user ? user.username : "Loading..."}
        </h1>
        <p className="col-md8 fs-4">You're successfully logg in!</p>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
