import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserProfile } from "../../utils/api";

const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState<{
    id: number;
    username: string;
    bio: string;
  } | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("No token found");
        navigate("/login");
        return;
      }

      try {
        const userData = await getUserProfile(token);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user profile", error);
      }

      if (userId) {
        fetchUser();
      }
    };
  }, [userId]);

  return (
    <div className="profile-container">
      <h1>{user ? user.username : "Loading"}</h1>
      <p>{user ? user.bio : "Loading bio..."}</p>
    </div>
  );
};

export default Profile;
