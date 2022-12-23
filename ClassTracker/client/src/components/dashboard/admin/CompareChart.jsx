import { CContainer, CCol, CRow, CFormSelect } from "@coreui/react";
import { CChart } from "@coreui/react-chartjs";
import { useState } from "react";

const CompareChart = ({ users, data }) => {
  const [user1, setUser1] = useState("");
  const [user2, setUser2] = useState("");
  return (
    <CContainer className="shadow rounded p-0">
      <CContainer
        className="text-center p-0 bg-primary text-secondary"
        style={{ borderRadius: "8px 8px 0 0" }}
      >
        Compare chart
      </CContainer>
      <CContainer fluid className="d-flex p-4 justify-content-center align-items-center">
        <CContainer className="mt-2 ps-4  ">
          <CRow cols={2}>
            <CCol>
              <CFormSelect
                onChange={(e) => {
                  setUser1(e.target.value);
                }}
                className="w-75 ms-5"
              >
                <option>Select a Student</option>
                {users.map((user, index) => (
                  <option key={index} value={index}>
                    {user}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol>
              <CFormSelect
                onChange={(e) => {
                  setUser2(e.target.value);
                }}
                className="w-75"
              >
                <option>Select a Student</option>
                {users.map((user, index) => (
                  <option key={index} value={index}>
                    {user}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>
        </CContainer>
      </CContainer>
      <CContainer className="ps-4">
        {user1 !== "" &&
          user2 !== "" &&
          user1 !== user2 &&
          user1 !== "Select a Student" &&
          user2 !== "Select a Student" && (
            <CChart
              className="chart"
              type="line"
              data={{
                labels: [
                  "Week 1",
                  "Week 2",
                  "Week 3",
                  "Week 4",
                  "Week 5",
                  "Week 6",
                  "Week 7",
                  "Week 8",
                  "Week 9",
                  "Week 10",
                  "Week 11",
                  "Week 12",
                  "Week 13",
                ],
                datasets: [
                  {
                    label: users[user1],
                    backgroundColor: "rgba(94, 23, 235, 1)",
                    borderColor: "rgba(94, 23, 235, 1)",
                    pointBackgroundColor: "rgba(94, 23, 235, 1)",
                    borderWidth: 2,
                    data: data[user1],
                  },
                  {
                    label: users[user2],
                    backgroundColor: "rgba(255,134,0,1)",
                    borderColor: "rgba(255,134,0,1)",
                    pointBackgroundColor: "rgba(255,134,0,1)",
                    borderWidth: 2,
                    data: data[user2],
                  },
                ],
              }}
            />
          )}
      </CContainer>
    </CContainer>
  );
};

export default CompareChart;
