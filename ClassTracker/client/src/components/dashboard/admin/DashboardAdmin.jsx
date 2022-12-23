import AverageChart from "./AverageChart";
import LeaderBoard from "../../Leaderboard";
import ViewProgress from "./ViewProgress";
import CompareChart from "./CompareChart";
import SAverageChart from "../student/studentAverageChart";
import StudentChart from "../student/studentChart";


import axios from "axios";
import { useEffect, useState } from "react";

import { CCol, CContainer, CRow } from "@coreui/react";
const DashboardAdmin = ({ users, data, average, leaderboard, studentData }) => {
  let [user, setUser] = useState([]);
  let [userData, setUserData] = useState([]);

  useEffect(() => {
    async function verify() {
      let data = await axios.get("/api/verify");
      setUser(data.data.name.toLowerCase());
      setUserData(data.data.role);
    }
    verify();
  }, []);
  return (
    <>
      {userData === "admin" ? (
        <CContainer fluid className="bg-secondary">
          <CRow lg={{ cols: 2 }}>
            <CCol>
              <LeaderBoard leaderboard={leaderboard} />
            </CCol>
            <CCol className="d-flex flex-column align-items-stretch">
              <AverageChart average={average} />
              <ViewProgress users={users} data={data} />
              <CompareChart users={users} data={data} />
            </CCol>
          </CRow>
        </CContainer>
      ) : (
        <>
          <CContainer fluid>
            <CRow lg={{ cols: 2 }}>
              <CCol>
                <h1 className="text-left text-primary mt-4 ps-2">
                  Welcome <span className="text-warning">{user}</span> 
                </h1>
                <SAverageChart
                  studentData={
                    data[
                      users.findIndex((e) => e.toString() === user.toString())
                    ]
                  }
                />
              </CCol>
              <CCol className="d-flex flex-column align-items-stretch mt-4">
                <h1 className="text-center text-primary ps-2"> Progress</h1>
                <StudentChart
                  data={
                    studentData[
                      users.findIndex((e) => e.toString() === user.toString())
                    ]
                  }
                />
              </CCol>
            </CRow>
          </CContainer>
        </>
      )}
    </>
  );
};

export default DashboardAdmin;
