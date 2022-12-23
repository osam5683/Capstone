import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import DashboardAdmin from "./components/dashboard/admin/DashboardAdmin";
import LeaderBoard from "./components/Leaderboard";
import Home from "./components/Home";
import Login from "./components/Login";
// import Footer from "./components/Footer";

import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

function App() {
  const [users, setUsers] = useState([]); // <--- This is the state variable that will hold the list of users
  const [data, setData] = useState([]); // <--- This is the state variable that will hold the list of users
  const [average, setAverage] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [userData, setUserData] = useState([]);
  const [uloggedIn, setUloggedIn] = useState(false);
  const userLog = (v) => {
    setUloggedIn(v);
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/sheets/all");
        setUsers(response.data.names);
        setData(response.data.userWeeklyData);
        setAverage(response.data.totalWeeklyDataSum);
        setLeaderboard(response.data.leaderboard);
        setUserData(response.data.studentAllData);
        setUloggedIn(Cookies.get("verified"));
      } catch (e) {
        console.error(e);
      }
    };
    fetchUsers();
  }, []);
  return (
    <>
      <Navbar log={uloggedIn} userLog={userLog} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login userLog={userLog} />} />
        <Route
          path="/dashboard"
          element={
            <DashboardAdmin
              users={users}
              average={average}
              data={data}
              leaderboard={leaderboard}
              studentData={userData}
            />
          }
        />
        <Route
          path="/leaderboards"
          element={<LeaderBoard leaderboard={leaderboard} />}
        />
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
