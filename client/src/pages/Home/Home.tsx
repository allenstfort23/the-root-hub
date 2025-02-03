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
        <button className="main-button">Rooted in Code, Built for Us</button>
        {isHovered && (
          <p className="dropdown"> R.O.O.T. → Raising Our Own Tech</p>
        )}
      </div>
    </div>
  );
};

export default Home;
