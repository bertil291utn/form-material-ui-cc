import { RangeCreateInput, RangoForm, SamplingCreateInput } from '@/interfaces/RangoForm';
import { Box, Button, IconButton, TextField } from '@mui/material';
import { Controller, UseFormReturn, useFieldArray } from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/Delete';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import { FocusEvent } from 'react';

const TipoMuestraMiniComp = ({ useFormHook }: {
  useFormHook: UseFormReturn<RangoForm, any, undefined>,
}) => {


  const INIT_MUESTREO = {
    id: '1',
    name: '',
  }

  const {
    trigger,
    control,
    getValues,
    formState,
  } = useFormHook;

  const { fields: muestreoInputs, append, remove } = useFieldArray({
    control,
    name: `rangos.0.samplings`
  })


  const _handleRemoveDetail = (index: number) => async () => {
    remove(index)

  }
  console.log(getValues())


  const handleAddNames = async () => {
    const isValidNames = await trigger(`rangos.0.samplings`);
    if (isValidNames) {
      append(
        {
          ...INIT_MUESTREO,
          id: ((getValues()?.rangos[0].samplings as Array<SamplingCreateInput>).length + 1).toString(),
        }
      )
    }
  }

  const handleBlurAction = async (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  ) => {
    trigger(e.target.name as any);

  }

  return (
    <>
      <Box>
        {
          muestreoInputs?.map((muestreoItem, indexMuestreo, arr) => {
            return (
              <div
                key={`muestreo-item-${muestreoItem.id}`}
                style={{ display: 'flex', gap: '3rem', alignItems: 'flex-end' }}>
                <Controller
                  name={`rangos.0.samplings.${indexMuestreo}.name`}
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) =>
                    <TextField
                      error={formState.errors.rangos ? !!(formState.errors.rangos[0] as any).samplings[indexMuestreo]?.name : false}
                      helperText={(formState.errors.rangos && !!(formState.errors.rangos[0] as any).samplings[indexMuestreo]?.name ) && `Nombre requerido`}
                      id="standard-basic-v-maximum" label="Nombre" variant="standard"
                      type='text'
                      {...field}
                      onBlur={handleBlurAction}
                    />
                  }
                />
                {arr.length > 1 &&
                  <IconButton aria-label="delete" size="small" title='Eliminar rango'
                    type='button'
                    onClick={_handleRemoveDetail(indexMuestreo)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              </div>
            )
          })
        }
      </Box>
      <Button
        onClick={handleAddNames}
        startIcon={<AddSharpIcon />}
        variant='outlined'
        color="primary"
        sx={{ mt: 4 }}
      >
        Agregar
      </Button>
    </>
  );
}

export default TipoMuestraMiniComp;