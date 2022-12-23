import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CContainer,
  CImage,
} from "@coreui/react";

import { ReactComponent as Rank1 } from "../assets/gold-cup.svg";
import { ReactComponent as Rank2 } from "../assets/silver-cup.svg";
import { ReactComponent as Rank3 } from "../assets/bronze-cup.svg";

const LeaderBoard = ({ leaderboard }) => {
  let topThree = leaderboard.slice(0, 3);
  let rest = leaderboard.slice(3);
  return (
    <CContainer className="mt-4 shadow p-0">
      <CContainer
        className="text-center p-0 bg-primary text-secondary"
        style={{ borderRadius: "8px 8px 0 0" }}
      >
        LeaderBoard
      </CContainer>
      <CTable bordered className="table table-striped text-center ">
        <CTableHead className="fs-4 text-primary">
          <CTableRow>
            <CTableHeaderCell scope="col" style={{ width: "33.33%" }}>
              Rank
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" style={{ width: "33.33%" }}>
              Name
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" style={{ width: "33.33%" }}>
              Total Marks
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {topThree.map((user, index) =>
            index === 0 ? (
              <CTableRow key={index}>
                <CTableHeaderCell scope="row" className="text-warning">
                  <Rank1 style={{ width: "32px", height: "34px" }} />
                </CTableHeaderCell>
                <CTableDataCell className="text-warning">
                  {user[1]}
                </CTableDataCell>
                <CTableDataCell className="text-warning">
                  {user[0]}
                </CTableDataCell>
              </CTableRow>
            ) : index === 1 ? (
              <CTableRow key={index}>
                <CTableHeaderCell scope="row" className="text-warning">
                  <Rank2 style={{ width: "32px", height: "34px" }} />
                </CTableHeaderCell>
                <CTableDataCell className="text-warning">
                  {user[1]}
                </CTableDataCell>
                <CTableDataCell className="text-warning">
                  {user[0]}
                </CTableDataCell>
              </CTableRow>
            ) : (
              <CTableRow key={index}>
                <CTableHeaderCell scope="row" className="text-warning">
                  <Rank3 style={{ width: "32px", height: "34px" }} />
                </CTableHeaderCell>
                <CTableDataCell className="text-warning">
                  {user[1]}
                </CTableDataCell>
                <CTableDataCell className="text-warning">
                  {user[0]}
                </CTableDataCell>
              </CTableRow>
            )
          )}

          {rest.map((user, index) => (
            <CTableRow key={index}>
              <CTableHeaderCell scope="row">{index + 4}</CTableHeaderCell>
              <CTableDataCell>{user[1]}</CTableDataCell>
              <CTableDataCell>{user[0]}</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </CContainer>
  );
};

export default LeaderBoard;
