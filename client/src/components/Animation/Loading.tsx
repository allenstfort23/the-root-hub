import { useEffect, useState } from "react";
import "./Loading.css";

const Loading = () => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    setTimeout(() => setFadeOut(true), 2000); // Fade out after 2 seconds
  }, []);

  return (
    <div className={`loading-screen ${fadeOut ? "fade-out" : ""}`}>
      <h1>The Root Hub</h1>
    </div>
  );
};

export default Loading;
