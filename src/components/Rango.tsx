
import { Box, Button, TextField, Typography } from '@mui/material';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import { UseFormRegister, UseFormReturn } from 'react-hook-form';
import { RangeCreateInput, RangoForm } from '@/interfaces/RangoForm';
import { ChangeEvent, useEffect, useState } from 'react';

const RangoMiniComp = ({
  useFormHook
}: {
  useFormHook: UseFormReturn<RangoForm, any, undefined>
}) => {
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useFormHook;
  const [rangeInputs, setRangeInputs] = useState<Array<RangeCreateInput>>([
    {
      id: '1',
      minimum: '',
      maximum: ''
    }
  ]);

  setValue("rangos", rangeInputs)


  const style = {
    display: 'flex',
    gap: 2,
  }

  const handleSelectionProd = (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, indexRange: number) => {
    const product = ev.target.value;
  }



  return (
    <div>
      <Box sx={style}>
        {rangeInputs?.map((_, indexRange) => {
          const currentVal = (getValues().rangos as Array<RangeCreateInput>)[indexRange]
          return (
            <div key={`index-Range-${indexRange}`}>

              <TextField
                {...register(`rangos.${indexRange}.minimum`, { required: true })}
                // onChange={(e) => handleSelectionProd(e, indexRange)}
                // value={currentVal.minimum}
                id="standard-basic-v-minimo" label="Valor minimo" variant="standard" name='vminimo' type='number' />
              <TextField
                {...register(`rangos.${indexRange}.maximum`, { required: true })}
                // onChange={(e) => handleSelectionProd(e, indexRange)}
                // value={currentVal.maximum}
                id="standard-basic-v-maximo" label="Valor Maximo" variant="standard" name='vmaximo' type='number' />
            </div>
          )
        })}

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