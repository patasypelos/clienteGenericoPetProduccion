// src/components/ArticuloTable.js
import React, { useEffect, useState } from 'react';
import NewTableComponent from './NewTableComponent'; // Ajusta la ruta según sea necesario

function ArticuloTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://localhost:44389/GetConsultarListaArticulos/GetConsultarListaArticulos') // Ajusta la URL según sea necesario
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching data');
        setLoading(false);
      });
  }, []);

  const columns = [
    { name: 'IdArticulo', align: 'left', width: '20%' },
    { name: 'Codigo', align: 'left', width: '20%' },
    { name: 'Precio', align: 'left', width: '20%' },
    { name: 'CantidadDisponible', align: 'left', width: '20%' },
    { name: 'TipoArticulo', align: 'left', width: '20%' },
    { name: 'TipoMarca', align: 'left', width: '20%' }
  ];

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <NewTableComponent columns={columns} rows={data} />
      )}
    </div>
  );
}

export default ArticuloTable;
