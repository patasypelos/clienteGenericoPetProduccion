import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";
import curved6 from "assets/images/curved-images/curved14.jpg";

// Consumir el API
function SignUp() {
    const { login } = useAuth(); // Usar el contexto de autenticación para acceder a la función de login
  
  const [agreement, setAgreement] = useState(true);
  const [Nombre, setNombre] = useState("");
  const [Apellidos, setApellidos] = useState("");
  const [Correo, setCorreo] = useState("");
  const [Contrasenia, setContrasenia] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSetAgreement = () => setAgreement(!agreement);

  // Llamada a la API para enviar los datos del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const baseUrl = process.env.REACT_APP_API_URL;
    const userData = {

      Nombre : Nombre,
      Apellidos : Apellidos,
      Correo : Correo,
      Contrasenia: Contrasenia,
      EstadoActivo: true, // Puede ajustarse según el estado que se requiera
    };

    try {
      
    fetch(`${baseUrl}/UsuarioAdministracionController/PostAddAgregarUsuario`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then(response => {
      
     debugger;
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Convierte la respuesta en un objeto JSON


        // setSuccess(true);
        // setError(null);
        // // Redireccionar a otra página o limpiar el formulario si es necesario
        // navigate("/dashboard");

      })
   
      .then(data => {

debugger;
        if (data.token !== "") {
          setSuccess(true);
          login(data.token); // Guardamos el token en el contexto

          // Redireccionar a otra página o limpiar el formulario si es necesario
          navigate("/dashboard");
        } else {
          setError(data.message); // Mostrar mensaje de error del servidor
        }

        // setSuccess(true);
        // setError(null);
        // // Redireccionar a otra página o limpiar el formulario si es necesario
        // navigate("/dashboard");
      })
      .catch(error => {

        setError('Comuniquese con el administrador del sistema.');
      });

   
    } catch (error) {
      console.log("rregiustr", userData);
      setError("Error al registrar el usuario: " + error.message);
    }





  };

  return (
    <BasicLayout
      title="Bienvenidos!"
      description="Patas & Pelos mas que una mascota.."
      image={curved6}
    >
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Re3gistrar con
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={2}>
          <Socials />
        </SoftBox>
        <Separator />
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form" onSubmit={handleSubmit}>
            <SoftBox mb={2}>
              <SoftInput
                placeholder="Nombre"
                value={Nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                placeholder="Apellidos"
                value={Apellidos}
                onChange={(e) => setApellidos(e.target.value)}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="email"
                placeholder="Correo Electrónico"
                value={Correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="password"
                placeholder="Contraseña"
                value={Contrasenia}
                onChange={(e) => setContrasenia(e.target.value)}
              />
            </SoftBox>
            <SoftBox display="flex" alignItems="center">
              <Checkbox checked={agreement} onChange={handleSetAgreement} />
              <SoftTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetAgreement}
                sx={{ cursor: "pointer", userSelect: "none" }}
              >
                &nbsp;&nbsp;Estoy de acuerdo  &nbsp;
              </SoftTypography>
              <SoftTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                textGradient
              >
                Términos y condiciones
              </SoftTypography>
            </SoftBox>
            {error && (
              <SoftBox mt={2}>
                <SoftTypography variant="caption" color="error">
                  {error}
                </SoftTypography>
              </SoftBox>
            )}
            {success && (
              <SoftBox mt={2}>
                <SoftTypography variant="caption" color="success">
                  Registro exitoso!
                </SoftTypography>
              </SoftBox>
            )}
            <SoftBox mt={4} mb={1}>
              <SoftButton variant="gradient" color="dark" fullWidth type="submit">
                Sign Up
              </SoftButton>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}




export default SignUp;