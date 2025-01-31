// import { useState, useEffect, useMemo } from "react";
// import { Routes, Route, Navigate, useLocation } from "react-router-dom";
// import { ThemeProvider } from "@mui/material/styles";
// import CssBaseline from "@mui/material/CssBaseline";
// import Icon from "@mui/material/Icon";
// // Soft UI Dashboard React components
// import SoftBox from "components/SoftBox";
// // Soft UI Dashboard React examples
// import Sidenav from "examples/Sidenav";
// import Configurator from "examples/Configurator";
// // Soft UI Dashboard React themes
// import theme from "assets/theme";
// import themeRTL from "assets/theme/theme-rtl";
// // RTL plugins
// import rtlPlugin from "stylis-plugin-rtl";
// import { CacheProvider } from "@emotion/react";
// import createCache from "@emotion/cache";
// // Soft UI Dashboard React routes
// import routes from "routes";
// // Soft UI Dashboard React contexts
// import { useSoftUIController, setMiniSidenav, setOpenConfigurator } from "context";
// // Images
// import brand from "assets/images/logopatas.png";
// // Importar AuthProvider y PrivateRoute
// import { AuthProvider } from "context/AuthContext"; // Asegúrate de usar la ruta correcta
// import PrivateRoute from "context/PrivateRoute"; // Actualiza la ruta aquí
// import { jwtDecode } from "jwt-decode";

// export default function App() {
//     const [menus, setMenus] = useState([]); // Estado para las rutas disponibles
//     console.log("menus afuera:", menus);

// useEffect(() => {
//   const token = localStorage.getItem("token"); // Obtener el token desde el localStorage
//   if (token) {
//     try {
//       const decodedToken = jwtDecode(token); // Decodificar el token
//       const availableRoutes = decodedToken.Menus ? decodedToken.Menus.split(",") : [];
//       setMenus(availableRoutes); // Establecer las rutas disponibles solo una vez
//       console.log("fuera:", menus);

//     } catch (error) {
//       console.error("Error decodificando el token:", error);
//     }
//   }
// }, []); 


//   const [controller, dispatch] = useSoftUIController();
//   const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
//   const [onMouseEnter, setOnMouseEnter] = useState(false);
//   const [rtlCache, setRtlCache] = useState(null);
//   const { pathname } = useLocation();

//   // Cache for the rtl
//   useMemo(() => {
//     const cacheRtl = createCache({
//       key: "rtl",
//       stylisPlugins: [rtlPlugin],
//     });

//     setRtlCache(cacheRtl);
//   }, []);

//   // Open sidenav when mouse enter on mini sidenav
//   const handleOnMouseEnter = () => {
//     if (miniSidenav && !onMouseEnter) {
//       setMiniSidenav(dispatch, false);
//       setOnMouseEnter(true);
//     }
//   };

//   // Close sidenav when mouse leave mini sidenav
//   const handleOnMouseLeave = () => {
//     if (onMouseEnter) {
//       setMiniSidenav(dispatch, true);
//       setOnMouseEnter(false);
//     }
//   };

//   // Change the openConfigurator state
//   const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

//   // Setting the dir attribute for the body element
//   useEffect(() => {
//     document.body.setAttribute("dir", direction);
//   }, [direction]);

//   // Setting page scroll to 0 when changing the route
//   useEffect(() => {
//     document.documentElement.scrollTop = 0;
//     document.scrollingElement.scrollTop = 0;
//   }, [pathname]);


//     const getRoutes = (allRoutes) =>
    
//       allRoutes.map((route) => {
//         if (route.collapse) {
//           return getRoutes(route.collapse);
//         }
//         if (route.route) {
//           return route.protected ? (
//             <Route
//               exact
//               path={route.route}
//               element={<PrivateRoute>{route.component}</PrivateRoute>}
//               key={route.key}
//             />
//           ) : (
//             <Route exact path={route.route} element={route.component} key={route.key} />
//           );
//         }
//         return null;
//       });

    
    

    
//   const configsButton = (
//     <SoftBox
//       display="flex"
//       justifyContent="center"
//       alignItems="center"
//       width="3.5rem"
//       height="3.5rem"
//       bgColor="white"
//       shadow="sm"
//       borderRadius="50%"
//       position="fixed"
//       right="2rem"
//       bottom="2rem"
//       zIndex={99}
//       color="dark"
//       sx={{ cursor: "pointer" }}
//       onClick={handleConfiguratorOpen}
//     >
//       <Icon fontSize="default" color="inherit">
//         settings
//       </Icon>
//     </SoftBox>
//   );

//   return (
//     <AuthProvider>  {/* Aquí envuelves la aplicación con AuthProvider */}
//       {direction === "rtl" ? (
//         <CacheProvider value={rtlCache}>
//           <ThemeProvider theme={themeRTL}>
//             <CssBaseline />
//             {layout === "dashboard" && (
//               <>
//                 <Sidenav
//                   color={sidenavColor}
//                   brand={brand}
//                   brandName="PATAS & PELOS"
//                   routes={routes.filter((route) => menus.includes(route.key))} // Solo rutas permitidas
//                   onMouseEnter={handleOnMouseEnter}
//                   onMouseLeave={handleOnMouseLeave}
//                 />
//                 <Configurator />
//                 {configsButton}
//               </>
//             )}
//             {layout === "vr" && <Configurator />}
//             <Routes>
//               {getRoutes(routes)}
//               <Route path="*" element={<Navigate to="/dashboard" />} />
//             </Routes>
//           </ThemeProvider>
//         </CacheProvider>
//       ) : (
//         <ThemeProvider theme={theme}>
//           <CssBaseline />
//           {layout === "dashboard" && (
//             <>
//               <Sidenav
//                 color={sidenavColor}
//                 brand={brand}
//                 brandName="PATAS & PELOS"
//                 routes={routes.filter((route) => menus.includes(route.key))} // Solo rutas permitidas
//                 onMouseEnter={handleOnMouseEnter}
//                 onMouseLeave={handleOnMouseLeave}
//               />
//               <Configurator />
//               {configsButton}
//             </>
//           )}
//           {layout === "vr" && <Configurator />}
//           <Routes>
//             {getRoutes(routes)}
//             <Route path="*" element={<Navigate to="/dashboard" />} />
//           </Routes>
//         </ThemeProvider>
//       )}
//     </AuthProvider>  
//   );
// }
import { useState, useEffect, useMemo } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";
import SoftBox from "components/SoftBox";
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import routes from "routes";
import { useSoftUIController, setMiniSidenav, setOpenConfigurator } from "context";
import brand from "assets/images/logopatas.png";
import { AuthProvider } from "context/AuthContext";
import PrivateRoute from "context/PrivateRoute";
import { jwtDecode } from "jwt-decode";

export default function App() {
  const [menus, setMenus] = useState([]);
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();

  // 🔹 Función para extraer y actualizar los menús desde el token
  const updateMenusFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const availableRoutes = decodedToken.Menus ? decodedToken.Menus.split(",") : [];

        // 🔹 Solo actualizar si los menús realmente cambiaron
        if (JSON.stringify(availableRoutes) !== JSON.stringify(menus)) {
          setMenus(availableRoutes);
        }
      } catch (error) {
        console.error("Error decodificando el token:", error);
        setMenus([]);
      }
    } else {
      setMenus([]); // Si no hay token, limpiar los menús
    }
  };

  // 🔹 Actualizar menús cuando cambia el token en localStorage
  useEffect(() => {
    updateMenusFromToken();
  }, [localStorage.getItem("token")]); // <- 🔥 Este es el truco para forzar actualización

  // 🔹 Escuchar cambios en localStorage (para cambios en otras pestañas)
  useEffect(() => {
    const handleStorageChange = () => updateMenusFromToken();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const rtlCache = useMemo(() => createCache({ key: "rtl", stylisPlugins: [rtlPlugin] }), []);

  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = useMemo(() => {
    return routes.map((route) => {
      if (route.collapse) return getRoutes(route.collapse);
      if (route.route) {
        return route.protected ? (
          <Route key={route.key} path={route.route} element={<PrivateRoute>{route.component}</PrivateRoute>} />
        ) : (
          <Route key={route.key} path={route.route} element={route.component} />
        );
      }
      return null;
    });
  }, [routes]);

  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  const configsButton = (
    <SoftBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.5rem"
      height="3.5rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="default" color="inherit">
        settings
      </Icon>
    </SoftBox>
  );

  return (
    <AuthProvider>
      {direction === "rtl" ? (
        <CacheProvider value={rtlCache}>
          <ThemeProvider theme={themeRTL}>
            <CssBaseline />
            {layout === "dashboard" && (
              <>
                <Sidenav
                  color={sidenavColor}
                  brand={brand}
                  brandName="PATAS & PELOS"
                  routes={menus.length ? routes.filter((route) => menus.includes(route.key)) : []}
                  onMouseEnter={handleOnMouseEnter}
                  onMouseLeave={handleOnMouseLeave}
                />
                <Configurator />
                {configsButton}
              </>
            )}
            {layout === "vr" && <Configurator />}
            <Routes>
              {getRoutes}
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </ThemeProvider>
        </CacheProvider>
      ) : (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {layout === "dashboard" && (
            <>
              <Sidenav
                color={sidenavColor}
                brand={brand}
                brandName="PATAS & PELOS"
                routes={menus.length ? routes.filter((route) => menus.includes(route.key)) : []}
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
              />
              <Configurator />
              {configsButton}
            </>
          )}
          {layout === "vr" && <Configurator />}
          <Routes>
            {getRoutes}
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </ThemeProvider>
      )}
    </AuthProvider>
  );
}
