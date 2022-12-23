import { CChart } from "@coreui/react-chartjs";
import { CContainer, CFormSelect } from "@coreui/react";
import { useState } from "react";

const StudentChart = ({ data }) => {
  let [selectedWeek, setSelectedWeek] = useState("");
  const weeks = [
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
  ];
  return (
    <CContainer fluid className="shadow rounded p-0 mt-3 mb-2">
      <CContainer
        className="text-center p-0 bg-primary text-secondary"
        style={{ borderRadius: "8px 8px 0 0" }}
      >
        Weekly Marks Distribution
      </CContainer>
      <CContainer className="p-2 mt-2">
        <CFormSelect
          onChange={(e) => {
            e.target.value !== "Select Week"
              ? setSelectedWeek(e.target.value)
              : setSelectedWeek("");
            console.log(selectedWeek);
          }}
          className="w-50 m-auto"
        >
          <option>Select Week</option>
          {weeks.map((week, index) => (
            <option key={index} value={index}>
              {week}
            </option>
          ))}
        </CFormSelect>
      </CContainer>
      <CContainer fluid className="p-2">
        {selectedWeek !== "" ? (
          <CChart
            type="radar"
            data={{
              labels: [
                "Assignment-1",
                "Assignment-2",
                "Bonus",
                "Blogs",
                "Attendance",
              ],
              datasets: [
                {
                  label: `Week ${+selectedWeek+1}`,
                  backgroundColor: "rgba(94, 23, 235, 0.5)",
                  borderColor: "rgba(94, 23, 235, 0.8)",
                  pointBackgroundColor: "rgba(94, 23, 235, 1)",
                  pointBorderColor: "#fff",
                  pointHighlightFill: "#fff",
                  pointHighlightStroke: "rgba(220, 220, 220, 1)",
                  data: data[selectedWeek],
                  pointHoverBackgroundColor: "rgba(255, 0, 0, 1)",
                  pointHitRadius: 10,
                },
              ],
            }}
          />
        ) : (
          <></>
        )}
      </CContainer>
    </CContainer>
  );
};

export default StudentChart;
