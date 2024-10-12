import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard Material-UI example components
import Table from "examples/Tables/Table";

// Componente para categorías
import ProductCategories from "../Projects"; // Asegúrate de ajustar la ruta si es necesario

// Datos para productos
const dogFoodData = [
  { id: 1, name: "Dog Food A", price: "$10" },
  { id: 2, name: "Dog Food B", price: "$12" },
];

const catFoodData = [
  { id: 1, name: "Cat Food A", price: "$8" },
  { id: 2, name: "Cat Food B", price: "$9" },
];

// Puedes agregar más datos para accesorios y baños si los necesitas
const accessoriesData = [
  { id: 1, name: "Collar", price: "$5" },
  { id: 2, name: "Cama", price: "$20" },
];

const bathData = [
  { id: 1, name: "Baño estándar", price: "$15" },
  { id: 2, name: "Baño premium", price: "$25" },
];

function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("dog"); // Categoría por defecto

  // Maneja el cambio de categoría
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Determinar los datos a mostrar en función de la categoría seleccionada
  let productData = [];
  switch (selectedCategory) {
    case "dog":
      productData = dogFoodData;
      break;
    case "cat":
      productData = catFoodData;
      break;
    case "accessories":
      productData = accessoriesData;
      break;
    case "bath":
      productData = bathData;
      break;
    default:
      productData = [];
  }

  // Preparar datos para la tabla
  const columns = [
    { name: "Nombre del Producto", selector: (row) => row.name },
    { name: "Precio", selector: (row) => row.price },
  ];

  const rows = productData.map((product) => ({
    id: product.id,
    name: product.name,
    price: product.price,
  }));

  return (
    <Card>
      <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <SoftBox>
          <SoftTypography variant="h6" gutterBottom>
            Productos
          </SoftTypography>
          <SoftBox display="flex" alignItems="center" lineHeight={0}>
            <Icon
              sx={{
                fontWeight: "bold",
                color: ({ palette: { info } }) => info.main,
                mt: -0.5,
              }}
            >
              done
            </Icon>
            <SoftTypography variant="button" fontWeight="regular" color="text">
              &nbsp;<strong>Categoría seleccionada:</strong>{" "}
              {selectedCategory === "dog"
                ? "Comida para Perros"
                : selectedCategory === "cat"
                ? "Comida para Gatos"
                : selectedCategory === "accessories"
                ? "Accesorios"
                : "Baños"}
            </SoftTypography>
          </SoftBox>
        </SoftBox>
      </SoftBox>

      {/* Renderizar las categorías de productos */}
      <ProductCategories onCategoryChange={handleCategoryChange} />

      {/* Mostrar la tabla de productos seleccionados */}
      <SoftBox
        sx={{
          "& .MuiTableRow-root:not(:last-child)": {
            "& td": {
              borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                `${borderWidth[1]} solid ${borderColor}`,
            },
          },
        }}
      >
        <Table columns={columns} rows={rows} />
      </SoftBox>
    </Card>
  );
}

export default Projects;