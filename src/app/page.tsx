'use client';

import DataGridBasicTable from '@/components/Table';
import rangoData from '@/data/data.json';
import { IconButton, Switch } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CommentSharpIcon from '@mui/icons-material/CommentSharp';


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
    width:130,
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


export default function Home() {
  return (
    <DataGridBasicTable
      columns={columns}
      rows={rows}
    />
  )
}
