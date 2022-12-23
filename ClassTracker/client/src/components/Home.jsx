import React from "react";
import homebg from "../assets/homebg.jpg";
import { CImage } from "@coreui/react";
import { CRow, CContainer, CCol, CButton } from "@coreui/react";
import { Link } from "react-router-dom";
function Home() {
  return (
    <>
      <CContainer
        lg
        className="d-flex justify-content-center align-items-center"
        style={{ height: "90vh" }}
      >
        <CRow className="w-100">
          <CCol>
            <p className="fs-1 fw-semibold text-primary ">
              <span role="img" aria-label="note">
                📝
              </span>
              Class Tracker
            </p>
            <p className="fs-4 text-break">
              Track all your assignments, PR's, attendence and progress, so you
              will be always updated with your progress <br></br>
            </p>
            <h2 className="fs-2 text-primary">Features :</h2>
            <ul className="fs-4">
              <li>Track your progress</li>
              <li>Compare your progress with your friends</li>
              <li>View your attendence</li>
              <li>Get your review for the week</li>
            </ul>

            <Link to="/login">
              <CButton
                className="btn shadow mb-3 m-1 border border-warning bg-warning text-secondary"
                size="lg"
              >
                Login
              </CButton>
            </Link>
            <Link to="/leaderboards">
              <CButton
                className="btn shadow mb-3 m-1 border border-warning bg-warning text-secondary"
                size="lg"
              >
                Leaderboard
              </CButton>
            </Link>
          </CCol>
          <CCol className="text-center d-none d-lg-block">
            <CImage src={homebg} fluid />
          </CCol>
        </CRow>
      </CContainer>
    </>
  );
}

export default Home;
