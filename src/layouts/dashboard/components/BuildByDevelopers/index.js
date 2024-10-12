import React, { useState, useEffect } from "react"; 
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import PropTypes from "prop-types";

function ProductCategories({ onCategoryChange }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const categories = [
    { title: "Comida para Perros y Gatos", description: "Variedad de comidas para perros y gatos de todas las razas.", icon: "pets", category: "PURINA" },
    { title: "Medicamentos para Gatos y Perros", description: "Medicamentos especialmente diseñadas para gatos y gatos.", icon: "pets", category: "MEDICAMENTO" },
    { title: "Accesorios para Mascotas", description: "Juguetes, collares, camas y más.", icon: "shopping_bag", category: "ACCESORIO" },
    { title: "Baños para Mascotas", description: "Servicios de baño y cuidado para tus mascotas.", icon: "bathtub", category: "Baño" },
  ];

  const handleCategoryChange = (category) => {
    
    setSelectedCategory(category);
    if (onCategoryChange) {
      onCategoryChange(category);
    }
    fetchProductos(category);

  };

  



  

  const fetchProductos = (category) => {
    setLoading(true);
    setError(null);

    const baseUrl = process.env.REACT_APP_API_URL;
    const endpoint = `${baseUrl}/ProductosServicosController/GetConsultarProductoServicoio?category=${category}`;

    fetch(endpoint)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        
        setProductos(data);
      })
      .catch(error => {
        setError('Error fetching data: ' + error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <Grid container spacing={3}>
        {categories.map((category, index) => (
          <Grid item xs={12} sm={6} lg={3} key={index}>
            <Card onClick={() => handleCategoryChange(category.category)} style={{ cursor: "pointer" }}>
              <SoftBox p={2} textAlign="center">
                <SoftBox mb={1}>
                  <Icon fontSize="large" color="info">
                    {category.icon}
                  </Icon>
                </SoftBox>
                <SoftTypography variant="h6" fontWeight="bold">
                  {category.title}
                </SoftTypography>
                <SoftTypography variant="body2" color="text" mb={2}>
                  {category.description}
                </SoftTypography>
              </SoftBox>
            </Card>
          </Grid>
        ))}
      </Grid>

      {error && <SoftTypography variant="body1" color="error">{error}</SoftTypography>}
      {loading && <SoftTypography variant="body1">Cargando...</SoftTypography>}
      {productos.length > 0 && !loading && (
        <SoftBox mt={3}>
          <SoftTypography variant="h5" fontWeight="bold">Productos:</SoftTypography>
          <Grid container spacing={3}>
            {productos.map((product) => (
              <Grid item xs={12} sm={6} lg={3} key={product.IdProdcuto}>
                <Card style={{ padding: "16px", textAlign: "center" }}>
                <img
              src={`${process.env.REACT_APP_API_URL_IMG}/Documentos/DocumentosArticulos/${product.imagenArchivo}`} // Concatenamos la URL base de la API
              alt={product.nombre}
              style={{ width: "100%", height: "auto" }}
            />
                  <SoftTypography variant="body1">{product.Nombre}</SoftTypography>
                  <SoftTypography variant="body2">{product.TipoProducto}</SoftTypography>
                  <SoftTypography variant="body2">Nombre: {product.nombre}</SoftTypography>
                  <SoftTypography variant="body2">Tipo producto: {product.tipoProducto}</SoftTypography>
                  <SoftTypography variant="body2">Cantidad Disponible: {product.cantidadDisponible}</SoftTypography>
                  <SoftTypography variant="body2">Precio: {product.precio}</SoftTypography>
               
                </Card>
              </Grid>
            ))}
          </Grid>
        </SoftBox>
      )}
    </div>
  );
}

ProductCategories.propTypes = {
  onCategoryChange: PropTypes.func.isRequired,
};

ProductCategories.defaultProps = {
  onCategoryChange: () => {},
};

export default ProductCategories;