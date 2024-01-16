'use client';

import DataGridBasicTable from '@/components/Table';
import rangoData from '@/data/data.json';
import { Button, IconButton, Switch } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CommentSharpIcon from '@mui/icons-material/CommentSharp';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import RemoveRedEyeSharpIcon from '@mui/icons-material/RemoveRedEyeSharp';
import { useState } from 'react';
import AddRangoForm from '@/components/AddRangoForm';


const columns: Array<GridColDef> = [
  { headerName: 'Minimo', field: 'minimo' },
  { headerName: 'Maximo', field: 'maximo' },
  {
    headerName: 'Estado', field: 'estado',
    renderCell: (params) =>
    (
      <>
        <Switch {...{ inputProps: { 'aria-label': 'Switch demo' } }} checked={params.row.estado} />
      </>
    )

  },
  {
    width: 140,
    headerName: 'Acciones',
    field: 'acciones',
    renderCell: (params) => (
      <>
        <IconButton aria-label="edit" size="small" title='Editar'>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete" size="small" title='Eliminar'>
          <DeleteIcon />
        </IconButton>
        <IconButton aria-label="comment" size="small" title='Ver comentario'>
          <CommentSharpIcon />
        </IconButton>
        <IconButton aria-label="ver" size="small" title='Ver'>
          <RemoveRedEyeSharpIcon />
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
  }
));
//TODO: set rows data into redux in a new layout comp
// and get data from redux in this same page

export default function Home() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div
        style={{ display: 'flex', justifyContent: 'flex-end' }}
      >

        <Button variant="text" startIcon={<AddSharpIcon />}
          onClick={handleOpen}
        >
          crear rango
        </Button>
      </div>
      <DataGridBasicTable
        columns={columns}
        rows={rows}
      />
      <AddRangoForm
        handleClose={handleClose}
        open={open}
      />
    </div>
  )
}
