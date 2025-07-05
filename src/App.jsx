import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideBar from "./Sidebar";
import Current from "./CurrentAffairs";
import Five from "./FiveYearPlans";
import './App.css';

import Sensus from './Sensus'
import { FaGlobe } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { SlTarget } from "react-icons/sl";




function App() {
  // Your menu items
const items = [
  { name: "Current Affairs (2024-25)", label: "Current Affairs", route: "/SSC/current", icon: <FaGlobe /> },
  { name: "Five Plans", label: "Five Year Plans", route: "/SSC/five", icon: <SlTarget /> },
  { name: "Senus 2011", label: "Senus 2011", route: "/SSC/sensus", icon: <FaPeopleGroup /> }
];

  return (
    <BrowserRouter>
      <div className="flex w-f">
        <SideBar items={items} />

          <Routes>
            <Route path="/SSC/current" element={<Current />} />
            <Route path="/SSC/five" element={<Five />} />
            <Route path="/SSC/sensus" element={<Sensus />} />
            <Route path="/*" element={
              <>
              <div className="w-screen h-f flex flex-col justify-center items-center">
                <h1>Welcome</h1>
                <p>Select a topic to start.</p>
                </div></>
            } />

          </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
