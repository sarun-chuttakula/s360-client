import React from "react";
import "./App.css";
// import Sidebar from "./components/sidebar/sidebar";
// import { Route, Routes } from "react-router-dom";
// import MainRouter from "./routes";
// import Profile from "./components/profile/Profile";
import Signup from "./pages/Signup";
// import MainRouter from "./routes";
// import Signup from "./pages/Signup";
// import Login from "./pages/Login";
function App() {
  // const [selectedItem, setSelectedItem] = useState(null);

  // const handleSidebarItemClick = (item: any) => {
  //   setSelectedItem(item);
  // };
  return (
    <>
      {/* <div className="app-container">
        <div className="top-bar">
          <div className="profileIcon absolute">
            <Profile />
          </div>
        </div>
        <div className="main">
          <div className="side-bar">
            <Sidebar />
          </div>
          <div className="context-container">
            <MainRouter />
          </div>
        </div>
      </div> */}
      <Signup />
    </>
  );
}

export default App;
