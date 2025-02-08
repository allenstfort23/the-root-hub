import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserProfile } from "../../utils/api";

const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState<{
    id: number;
    username: string;
    bio: string;
  } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const profile = await getUserProfile(userId);
        setUser(profile);
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
      <h1>{user ? user?.username : "Loading"}</h1>
      <p>{user ? user.bio : "Loading bio..."}</p>
    </div>
  );
};

export default Profile;
