import { RangeCreateInput, RangoForm } from '@/interfaces/RangoForm';
import { Box, TextField } from '@mui/material';
import { Controller, UseFormReturn } from 'react-hook-form';

const RangoMuestraMiniComp = ({
  useFormHook
}: {
  useFormHook: UseFormReturn<RangoForm, any, undefined>,
}) => {
  const {
    trigger,
    control,
    getValues,
    formState,
  } = useFormHook;

  const rangeArr = [...getValues().rangos]
  return (
    <Box>
      <RangeComponente
        useFormHook={useFormHook}
      />
    </Box>
  );
}



const RangeComponente = ({
  useFormHook,
}: {
  useFormHook: UseFormReturn<RangoForm, any, undefined>,
}) => {
  const {
    trigger,
    control,
    getValues,
    formState,
  } = useFormHook;

  const rangeArr = [...getValues().rangos]

  return rangeArr?.map((rangeItem, indexRange, arr) => {
    return (
      <div
        key={`index-range-${rangeItem.id}`}
        style={{ display: 'flex', gap: '3rem', alignItems: 'flex-end' }}>

        <Controller
          disabled
          name={`rangos.${indexRange}.tempDisplay`}
          control={control}
          defaultValue={`${rangeItem.minimum}-${rangeItem.maximum}`}
          render={({ field }) =>
            <TextField
              id="standard-basic-range" label="Rango" variant="standard"
              type='text'
              {...field}
            />
          }
        />
      </div>
    )
  })

}

export default RangoMuestraMiniComp;