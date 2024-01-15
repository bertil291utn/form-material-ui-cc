
import { Alert, Box, Button, IconButton, Snackbar, TextField } from '@mui/material';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import { Controller, UseFieldArrayReturn, UseFormReturn,useFieldArray } from 'react-hook-form';
import { RangoForm } from '@/interfaces/RangoForm';
import DeleteIcon from '@mui/icons-material/Delete';
import { FocusEvent, useState } from 'react';
import { IsValidRangeDistance } from '@/app/utils/Rango.utils';

const RangoMiniComp = ({
  useFormHook,
  handleAlertMessage
}: {
  useFormHook: UseFormReturn<RangoForm, any, undefined>,
  handleAlertMessage: (min: number, max: number) => void
}) => {
  const {
    trigger,
    control,
    getValues,
    formState,
  } = useFormHook;

  const INIT_RANGOS = {
    id: '1',
    minimum: '',
    maximum: ''
  }



  const { fields: rangeInputs, append, remove } = useFieldArray({
    control,
    name: "rangos"
  })
  const [isValidRangeInputValid, setIsValidRangeInputValid] = useState(false)



  const style = {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  }



  const handleAddRangos = async () => {
    const isValidRangos = await trigger("rangos");
    const lastMaximum = [...getValues()?.rangos].pop()?.maximum as string
    const min = Number(getValues().rangos[getValues().rangos.length - 1].minimum);
    const max = Number(getValues().rangos[getValues().rangos.length - 1].maximum);
    if (!IsValidRangeDistance({ min, max })) {
      handleAlertMessage(min, max)
      return;
    }

    if (isValidRangos) {
      append(
        {
          ...INIT_RANGOS,
          id: (getValues()?.rangos.length + 1).toString(),
          minimum: (Number(lastMaximum) + 1).toString()
        }
      )
    }
  };


  const _handleRemoveDetail = (index: number) => async () => {
    remove(index)
    setIsValidRangeInputValid(await trigger("rangos"))

  }


  const handleBlurAction = async (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  ) => {
    trigger(e.target.name as any);

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
                      error={formState.errors.rangos ? !!formState.errors.rangos[indexRange]?.minimum : false}
                      helperText={(formState.errors.rangos && !!formState.errors.rangos[indexRange]?.minimum) && `Valor minimo requerido`}
                      id="standard-basic-v-minimum" label="Valor minimo" variant="standard"
                      type='number'
                      {...field}
                      onBlur={handleBlurAction}
                    />
                  }
                />
                <Controller
                  name={`rangos.${indexRange}.maximum`}
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) =>
                    <TextField
                      error={formState.errors.rangos ? !!formState.errors.rangos[indexRange]?.maximum : false}
                      helperText={(formState.errors.rangos && !!formState.errors.rangos[indexRange]?.maximum) && `Valor maximo requerido`}
                      id="standard-basic-v-maximum" label="Valor maximo" variant="standard"
                      type='number'
                      {...field}
                      onBlur={handleBlurAction}
                    />
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
          })
        }

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