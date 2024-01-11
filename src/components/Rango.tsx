import { Box, Button, TextField, Typography } from '@mui/material';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import { UseFormRegister } from 'react-hook-form';
import { RangoForm } from '@/interfaces/RangoForm';

const RangoMiniComp = ({
  register
}: {
  register: UseFormRegister<RangoForm>
}) => {
  const style = {
    display: 'flex',
    gap: 2,

  }
  return (
    <div>
      <Box sx={style}>
        <TextField
          {...register("rango", { required: true })}
          id="standard-basic-v-minimo" label="Valor minimo" variant="standard" name='vminimo' type='number' />
        <TextField id="standard-basic-v-maximo" label="Valor Maximo" variant="standard" name='vmaximo' type='number' />

      </Box>
      <Button
        startIcon={<AddSharpIcon />}
        variant='outlined'
        color="primary"
        sx={{ mt: 4 }}
      >
        Agregar
      </Button>
    </div>
  );
}

export default RangoMiniComp;