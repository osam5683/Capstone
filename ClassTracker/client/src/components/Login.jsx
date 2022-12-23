import {
  CContainer,
  CForm,
  CFormLabel,
  CFormInput,
  CButton,
} from "@coreui/react";

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ userLog }) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const login = async (e) => {
    try {
      e.preventDefault();
      await axios.post("/api/login", inputs);
      userLog(true);
      navigate("/dashboard");
    } catch (error) {
      setError(error.response.data.error);
      console.log(error.response.data.error);
    }
  };
  return (
    <CContainer
      className="d-flex justify-content-center align-items-center"
      style={{ height: "80vh" }}
    >
      <CForm
        className="w-50 border rounded d-flex flex-column bg-secondary shadow p-5 "
        xs={{ width: "100vw" }}
        onSubmit={(e) => login(e)}
      >
        {error && <p className="text-danger p-0 m-0 text-center">{error}</p>}

        <h1 className="text-center text-primary">Login</h1>
        <CFormLabel className="mt-3">Email</CFormLabel>
        <CFormInput
          type="email"
          name="email"
          value={inputs.email}
          placeholder="Enter your email"
          onChange={handleChange}
          required
        />
        <CFormLabel className="mt-3">Password</CFormLabel>
        <CFormInput
          type="password"
          name="password"
          value={inputs.password}
          placeholder="Enter your password"
          onChange={handleChange}
          required
        />
        <CButton
          className="mt-5 btn btn-primary border rounded shadow w-50 align-self-center text-secondary"
          type="submit"
        >
          Login
        </CButton>
      </CForm>
    </CContainer>
  );
};
export default Login;
