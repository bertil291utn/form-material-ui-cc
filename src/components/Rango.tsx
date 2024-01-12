
import { Box, Button, IconButton, TextField } from '@mui/material';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import { Controller, UseFieldArrayReturn, UseFormReturn } from 'react-hook-form';
import { RangoForm } from '@/interfaces/RangoForm';
import DeleteIcon from '@mui/icons-material/Delete';

const RangoMiniComp = ({
  useFormHook,
  useFieldArray
}: {
  useFormHook: UseFormReturn<RangoForm, any, undefined>,
  useFieldArray: UseFieldArrayReturn<RangoForm, "rangos", "id">
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



  const { fields: rangeInputs, append, remove } = useFieldArray

  const style = {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  }



  const handleAddRangos = () => {
    append({ ...INIT_RANGOS, id: (getValues()?.rangos.length + 1).toString() })
  };
  console.log(getValues())


  const _handleRemoveDetail = (index: number) => () => {
    remove(index)

  }


  return (
    <div>
      <Box sx={style}>
        {
          rangeInputs?.map((rangeItem, indexRange, arr) => {
            return (
              <div
                key={`index-range-${rangeItem.id}`}
                style={{ display: 'flex', gap: '3rem', alignItems: 'flex-end' }}>

                <Controller
                  name={`rangos.${indexRange}.minimum`}
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) =>
                    <TextField
                      {...field}
                      error={errors.rangos ? !!errors.rangos[indexRange]?.minimum : false}
                      helperText={(errors.rangos && !!errors.rangos[indexRange]?.minimum) && `Valor minimo requerido`}
                      id="standard-basic-v-minimum" label="Valor minimo" variant="standard" name='minimum' type='number' />
                  }
                />
                <Controller
                  name={`rangos.${indexRange}.maximum`}
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) =>
                    <TextField
                      {...field}
                      error={errors.rangos ? !!errors.rangos[indexRange]?.maximum : false}
                      helperText={(errors.rangos && !!errors.rangos[indexRange]?.maximum) && `Valor maximo requerido`}
                      id="standard-basic-v-maximum" label="Valor maximo" variant="standard" name='maximum' type='number' />
                  }
                />
                {arr.length > 1 &&
                  <IconButton aria-label="delete" size="small" title='Eliminar rango'
                    type='button'
                    onClick={_handleRemoveDetail(indexRange)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              </div>
            )
          })}

      </Box >
      <Button
        onClick={handleAddRangos}
        startIcon={<AddSharpIcon />}
        variant='outlined'
        color="primary"
        sx={{ mt: 4 }}
      >
        Agregar
      </Button>
    </div >
  );
}

export default RangoMiniComp;