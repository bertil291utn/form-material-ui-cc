import { Box, TextField, Typography } from '@mui/material';

const RangoMiniComp = () => {
  const style = {
    display: 'flex',
    gap: 2,

  }
  return (
    <div>
      <Box sx={style}>
        <TextField id="standard-basic" label="Valor minimo" variant="standard" name='vminimo' />
        <TextField id="standard-basic" label="Valor Maximo" variant="standard" name='vmaximo' />
      </Box>
    </div>
  );
}

export default RangoMiniComp;