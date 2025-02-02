import { useState } from "react";
import "./Home.css";

const Home = () => {
  const [isHovered, setIsHovered] = useState<Boolean>(false);
  return (
    <div className="container-fluid home">
      <div className="header">
        <h1>The Root Hub</h1>
      </div>
      <div
        className="buttons"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        <button className="main-button">All Code, All Black</button>
        {isHovered && (
          <p className="dropdown">
            🔹 C.O.D.E. → Community of Developers & Engineers
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
