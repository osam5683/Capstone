import {
  CNavbar,
  CContainer,
  CNavbarBrand,
  CNavbarToggler,
  CCollapse,
  CNavbarNav,
  CNavItem,
  CImage,
} from "@coreui/react";

import { useState } from "react";

import axios from "axios";

import cfiLogo from "../../assets/cfilogofull.jpeg";
import { NavLink} from "react-router-dom";

const Navbar = ({ log , userLog }) => {
  const [visible, setVisible] = useState(false);
  async function logout() {
    await axios.post("/api/logout");
    userLog(false);
  }
  return (
    <>
      <CNavbar expand="lg" colorScheme="light" className="bg-secondary shadow">
        <CContainer fluid>
          <NavLink to="/">
            <CNavbarBrand  style={{ color: "#f2ab40" }}>
              <CImage
                rounded
                thumbnail
                src={cfiLogo}
                alt="Logo of CFI"
                width="150px"
              />
            </CNavbarBrand>
          </NavLink>
          <CNavbarToggler onClick={() => setVisible(!visible)} />
          <CCollapse className="navbar-collapse" visible={visible}>
            <CNavbarNav>
              <CNavItem>
                <NavLink
                  to="/dashboard"
                  className="fs-4 text-primary ps-4 text-decoration-none"
                >
                  Dashboard
                </NavLink>
              </CNavItem>
              <CNavItem>
                <NavLink
                  to="/leaderboards"
                  className="fs-4 text-primary ps-4 text-decoration-none"
                >
                  Leaderboard
                </NavLink>
              </CNavItem>
              <CNavItem>
                {log ? (
                  <NavLink
                    onClick={logout}
                    className="fs-4 text-primary ps-4 text-decoration-none"
                    to="/"
                  >
                    Logout
                  </NavLink>
                ) : (
                  <NavLink
                    to="/login"
                    className="fs-4 text-primary ps-4 text-decoration-none"
                  >
                    Login
                  </NavLink>
                )}
              </CNavItem>
            </CNavbarNav>
          </CCollapse>
        </CContainer>
      </CNavbar>
    </>
  );
};

export default Navbar;
