'use client';

import DataGridBasicTable from '@/components/Table';
import rangoData from '@/data/data.json';
import { IconButton } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const columns:Array<GridColDef> = [
  { headerName: 'Minimo', field: 'minimo' },
  { headerName: 'Maximo', field: 'maximo' },
  { headerName: 'Estado', field: 'estado' },
  {
    headerName: 'Acciones',
    field: 'acciones',
    renderCell: (params) => (
      <>
        <IconButton aria-label="edit" size="small">
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete" size="small">
          <DeleteIcon />
        </IconButton>
      </>
    ),
  },
]

const rows = rangoData.map(data => (
  {
    id: data.id,
    minimo: data.minimum,
    maximo: data.maximum,
    estado: data.status,
    acciones: undefined,
  }
));


export default function Home() {
  return (
    <DataGridBasicTable
      columns={columns}
      rows={rows}
    />
  )
}
