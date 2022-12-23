import { CChart } from "@coreui/react-chartjs";
import { CContainer } from "@coreui/react";

const AverageChart = ({ average }) => {
  return (
    <CContainer className="mt-4  shadow mb-4 rounded p-0 ">
      {/* <h1 className="text-center">Average Marks: </h1> */}
      <CContainer
        className="text-center p-0 bg-primary text-secondary"
        style={{ borderRadius: "8px 8px 0 0" }}
      >
        Average chart
      </CContainer>
      <CChart
        className="chart p-4"
        style={{ borderRadius: "0 0 8px 8px" }}
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
              label: "Average Marks",
              backgroundColor: "rgba(94, 23, 235, 1)",
              borderColor: "rgba(94, 23, 235, 1)",
              pointBackgroundColor: "rgba(94, 23, 235, 1)",
              data: average,
              borderWidth: 2,
            },
          ],
        }}
      />
    </CContainer>
  );
};

export default AverageChart;
