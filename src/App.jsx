import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Video from "./Pages/Video/Video";

const App = () => {
  const [sidebar, setSidebar] = useState(window.innerWidth > 900);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const onResize = () => {
      setSidebar(window.innerWidth > 900);
    };
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize)
  }, []);

  return (
    <div>
      <Router>
        <Navbar setSidebar={setSidebar} setSearchQuery={setSearchQuery} />
        <Routes>
          <Route path="/" element={<Home sidebar={sidebar} searchQuery={searchQuery} />} />
          <Route path="/video/:categoryId/:videoId" element={<Video />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
