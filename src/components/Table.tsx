'use client';

import { DataGrid, GridColDef,  } from '@mui/x-data-grid';


export default function DataGridBasicTable({
  rows,
  columns
}: {
  rows: Array<any>
  columns: Array<GridColDef>
}) {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        disableRowSelectionOnClick
      />
    </div>
  );
}