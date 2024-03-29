'use client';

import DataGridBasicTable from '@/components/Table';
import { Button, IconButton, Switch } from '@mui/material';
import { GridColDef, GridRenderCellParams, GridTreeNodeWithRender } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CommentSharpIcon from '@mui/icons-material/CommentSharp';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import RemoveRedEyeSharpIcon from '@mui/icons-material/RemoveRedEyeSharp';
import { useState } from 'react';
import AddRangoForm from '@/components/AddRangoForm';
import { useSelector } from 'react-redux';
import { RangeFormSelector } from '@/redux/selectors';
import UpdateRangoForm from '@/components/UpdateRangoForm';
import { Range } from '@/interfaces/Range';





export default function HomePage() {
  const columns: Array<GridColDef> = [
    { headerName: 'Minimo', field: 'minimum' },
    { headerName: 'Maximo', field: 'maximum' },
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
          <IconButton aria-label="edit" size="small" title='Editar'
            onClick={handleUpdateRange(params)}
          >
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

  const _rangos = useSelector(RangeFormSelector)
  const [open, setOpen] = useState(false);
  const [openUpdateRangeForm, setOpenUpdateRangeForm] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseUpdateForm = () => setOpenUpdateRangeForm(false);
  const [currentUpdateRow, setCurrentUpdateRow] = useState<Range>({} as Range)

  const rows = _rangos.map(data => (
    {
      id: data.id,
      minimum: data.minimum,
      maximum: data.maximum,
      estado: data.status,
      samplingRanges: data.samplingRanges,
    }
  ));

  const handleUpdateRange = (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => () => {
    setOpenUpdateRangeForm(true)
    setCurrentUpdateRow(params.row)
  }

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
      <UpdateRangoForm
        handleClose={handleCloseUpdateForm}
        open={openUpdateRangeForm}
        data={currentUpdateRow}
      />
    </div>
  )
}
