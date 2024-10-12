/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// react-router-dom components
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";

function SignIn() {
  const [rememberMe, setRememberMe] = useState(true);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState(null);


  const navigate = useNavigate();



  const handleSetRememberMe = () => setRememberMe(!rememberMe);



    // Llamada a la API para enviar los datos del formulario
    const handleSubmitEnter = async (e) => {
      e.preventDefault();
  
      const baseUrl = process.env.REACT_APP_API_URL;
      const userDataEnter = {
  
        Correo : email,
        Contrasenia : password,
      };
  

      fetch(`${baseUrl}/UsuarioAdministracionController/GetConsultarUsuarioRegistrado?Correo=${email}&Contrasenia=${password}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Convierte la respuesta en un objeto JSON
      })
      .then(data => {
        debugger;
        if (data.code === 200) {
          // Redireccionar a otra página o limpiar el formulario si es necesario
          navigate("/dashboard");
        } else {
          setError(data.message); // Mostrar mensaje de error del servidor
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setError('Error fetching data from the server'); // Manejar errores de red o de servidor
      });


  
    };


  return (
    <CoverLayout
      title="Bienvenido a Patas & Pelos"
      description="Ingresa tu correo electrónico y contraseña para iniciar sesión"
      image={curved9}
    >
      <SoftBox component="form" role="form" onSubmit={handleSubmitEnter}>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Email
            </SoftTypography>
          </SoftBox>
          <SoftInput type="email" placeholder="Email" 
          value={email}
          onChange={(e) => setemail(e.target.value)}/>
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SoftTypography>
          </SoftBox>
          <SoftInput type="password" placeholder="Password" 
                value={password}
                onChange={(e) => setpassword(e.target.value)} />
        </SoftBox>
        <SoftBox display="flex" alignItems="center">
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <SoftTypography
            variant="button"
            fontWeight="regular"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;Recordar usuario
          </SoftTypography>
        </SoftBox>
        {error && (
              <SoftBox mt={2}>
                <SoftTypography variant="caption" color="error">
                  {error}
                </SoftTypography>
              </SoftBox>
            )}
        <SoftBox mt={4} mb={1}>
          <SoftButton variant="gradient" color="info" fullWidth type="submit">
            Ingresar
          </SoftButton>
        </SoftBox>
        <SoftBox mt={3} textAlign="center">
          <SoftTypography variant="button" color="text" fontWeight="regular">
          ¿No &apos;tienes una cuenta?{" "}
            <SoftTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              Inscribirse
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
      </SoftBox>
    </CoverLayout>
  );
}

export default SignIn;
