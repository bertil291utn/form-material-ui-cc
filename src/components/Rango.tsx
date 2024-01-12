
import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import { Controller, UseFormRegister, UseFormReturn } from 'react-hook-form';
import { RangeCreateInput, RangoForm } from '@/interfaces/RangoForm';
import { ChangeEvent, useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

const RangoMiniComp = ({
  useFormHook
}: {
  useFormHook: UseFormReturn<RangoForm, any, undefined>
}) => {
  const {
    control,
    register,
    getValues,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useFormHook;

  const INIT_RANGOS = {
    id: '1',
    minimum: '',
    maximum: ''
  }

  const [rangeInputs, setRangeInputs] = useState<Array<RangeCreateInput>>([
    INIT_RANGOS
  ]);

  setValue("rangos", rangeInputs)


  const style = {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  }

  const handleSelectionProd = (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, indexRange: number) => {
    const product = ev.target.value;
    // setValue("rangos", tempRangos[indexRange])
    // const tempRangos = [...getValues().rangos]
  }


  const handleAddRangos = () => {
    const updatedRange: any = [...getValues()?.rangos] || [];
    updatedRange.push({ ...INIT_RANGOS, id: (getValues()?.rangos.length + 1).toString() });
    setRangeInputs(updatedRange);
    // setValue("rangos", updatedRange);
  };
  console.log(getValues())


  return (
    <div>
      <Box sx={style}>
        {rangeInputs?.map((_, indexRange, arr) => {
          const currentVal = (getValues().rangos as Array<RangeCreateInput>)[indexRange]
          return (
            <div key={`index-Range-${indexRange}`}
              style={{ display: 'flex', gap: '3rem', alignItems: 'flex-end' }}>

              <Controller
                name={`rangos.${indexRange}.minimum`}
                control={control}
                render={({ field }) =>
                  <TextField
                    {...field}
                    id="standard-basic-v-minimo" label="Valor minimo" variant="standard" name='minimum' type='number' />
                }
              />
              <Controller
                name={`rangos.${indexRange}.maximum`}
                control={control}
                render={({ field }) =>
                  <TextField
                    {...field}
                    id="standard-basic-v-maximum" label="Valor maximum" variant="standard" name='maximum' type='number' />
                }
              />
              {arr.length > 1 &&
                <IconButton aria-label="delete" size="small" title='Eliminar rango'>
                  <DeleteIcon />
                </IconButton>}
            </div>
          )
        })}

      </Box>
      <Button
        onClick={handleAddRangos}
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