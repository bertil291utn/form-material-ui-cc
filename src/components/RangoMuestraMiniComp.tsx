import { RangeCreateInput, RangoForm, SamplingCreateInput } from '@/interfaces/RangoForm';
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
        key={`index-range-c-${rangeItem.id}`}
        style={{ display: 'flex', gap: '3rem', alignItems: 'flex-end' }}
      >

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
        <div
          style={{ display: 'flex', gap: '3rem', alignItems: 'flex-end' }}
        >
          <MuestreoComponente
            muestreoArr={rangeItem.samplings as Array<SamplingCreateInput>}
            rangeItemIndex={indexRange}
            useFormHook={useFormHook}

          />
        </div>
      </div>
    )
  })

}

const MuestreoComponente = ({
  muestreoArr,
  rangeItemIndex,
  useFormHook
}: {
  muestreoArr: Array<SamplingCreateInput>,
  rangeItemIndex: number,
  useFormHook: UseFormReturn<RangoForm, any, undefined>,
}) => {

  const {
    trigger,
    control,
    getValues,
    formState,
  } = useFormHook;
  return (
    <>
      {
        muestreoArr?.map((muestreoItem, indexRange, arr) => {
          return (
            <div
              key={`index-range-m-${muestreoItem.id}`}
              style={{ display: 'flex', gap: '3rem', alignItems: 'flex-end' }}>

              <Controller
                name={`rangos.${rangeItemIndex}.samplings.${indexRange}.samplingRange.numberSamples`}
                control={control}
                rules={{ required: true }}

                render={({ field }) =>
                  <TextField
                    // error={formState.errors.rangos ? !!formState.errors.rangos[indexRange]?.minimum : false}
                    // helperText={(formState.errors.rangos && !!formState.errors.rangos[indexRange]?.minimum) && `Valor minimo requerido`}
                    id="standard-basic-number-sample" label={muestreoItem.name} variant="standard"
                    type='number'
                    {...field}
                  // onBlur={handleBlurAction}
                  />
                }
              />
            </div>
          )
        })}
    </>

  );
}


export default RangoMuestraMiniComp;