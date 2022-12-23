import { CContainer, CFormSelect } from "@coreui/react";
import { CChart } from "@coreui/react-chartjs";
import { useState } from "react";

const ViewProgress = ({ users, data }) => {
  let [selectedUser, setSelectedUser] = useState("");
  return (
    <CContainer className="mb-3 mt-1 shadow rounded p-0">
      <CContainer
        className="text-center p-0 bg-primary text-secondary"
        style={{ borderRadius: "8px 8px 0 0" }}
      >
        View Progress Chart
      </CContainer>
      <CContainer className="d-flex p-4 align-items-center justify-content-center">
        <CFormSelect
          onChange={(e) => {
            setSelectedUser(e.target.value);
          }}
          className="w-50 ms-5"
        >
          <option>Select a Student</option>
          {users.map((user, index) => (
            <option key={index} value={index}>
              {user}
            </option>
          ))}
        </CFormSelect>
      </CContainer>
      <CContainer className="ps-4">
        {selectedUser !== "" && selectedUser !== "Select a Student" && (
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
                  label: users[selectedUser],
                  backgroundColor: "rgba(94, 23, 235, 1)",
                  borderColor: "rgba(94, 23, 235, 1)",
                  pointBackgroundColor: "rgba(94, 23, 235, 1)",
                  pointBorderColor: "rgba(94, 23, 235, 1)",
                  borderWidth: 2,
                  data: data[selectedUser],
                },
              ],
            }}
          />
        )}
      </CContainer>
    </CContainer>
  );
};

export default ViewProgress;
