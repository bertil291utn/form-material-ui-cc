import { IsValidRangeDistance } from '@/utils/Rango.utils';
import { sleep } from '@/utils/sleep';
import RangoMiniComp from '@/components/Rango';
import RangoMuestraMiniComp from '@/components/RangoMuestraMiniComp';
import TipoMuestraMiniComp from '@/components/TipoMuestraMiniComp';
import { RangeCreateInput, RangoForm, SamplingCreateInput, SamplingRangeCreateInput } from '@/interfaces/RangoForm';
import { PageType } from '@/interfaces/RangoStep.enum';
import { Alert, Box, Button, CircularProgress, IconButton, Modal, Snackbar, Step, StepButton, StepLabel, Stepper, TextField, Typography } from '@mui/material';
import { FocusEvent, useEffect, useState } from 'react';
import { Controller, SubmitHandler, UseFormReturn, useFieldArray, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addNewRanges } from '@/redux/Range.reducer';
import { RangeFormSelector } from '@/redux/selectors';
import { Range } from '@/interfaces/Range';
import { RangoUpdateForm } from '@/interfaces/RangoForm';
import DeleteIcon from '@mui/icons-material/Delete';
import AddSharpIcon from '@mui/icons-material/AddSharp';

const steps = ['Rango', 'Tipo muestra', 'Rango muestreo'];
const generateInitRangos = (_rangos: Array<Range>) => {
  return {
    id: '1',
    minimum: _rangos?.length
      ? (Number(_rangos[_rangos.length - 1].maximum) + 1).toString()
      : '1',
    maximum: '',
    samplings: [
      {
        id: '1',
        name: '',
        samplingRange: { id: '1', numberSamples: '' },
      },
    ],
  };
};


const UpdateRangoForm = ({ handleClose, open, data }: {
  handleClose: () => void
  open: boolean,
  data: Range
}) => {
  const _rangos = useSelector(RangeFormSelector)

  const INIT_RANGOS = generateInitRangos(_rangos);
  const useFormHook = useForm<RangoUpdateForm>({
    // defaultValues: { rangos: [INIT_RANGOS] }
  });



  const {
    reset,
    setValue,
    getValues,
    control,
    trigger,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useFormHook;

  useEffect(() => {
    // setValue('rangos', [INIT_RANGOS]);
  }, [_rangos, setValue]);

  useEffect(() => {
    setValue("rango", data)

  }, [data])

  console.log(watch("rango"))

  const [activeStep, setActiveStep] = useState(0);
  const [distanceRangeErrorMsg, setDistanceRangeErrorMsg] = useState('')



  const dispatch = useDispatch()

  const handleNext = () => {
    // const isValidRangos = await trigger("rangos");
    // const isValidNames = await trigger(`rangos.0.samplings`);
    // const min = Number(getValues().rangos[getValues().rangos.length - 1].minimum);
    // const max = Number(getValues().rangos[getValues().rangos.length - 1].maximum);
    // if (!IsValidRangeDistance({ min, max })) {
    //   handleAlertMessage(min, max)
    //   return;
    // }
    // if (!isValidRangos || !isValidNames) { return; }

    // if (activeStep == PageType.TIPO_MUESTRA) {
    //   const _rangos = [...getValues().rangos]
    //   setValue("rangos",
    //     _rangos.map((rango: RangeCreateInput) => (
    //       {
    //         ...rango,
    //         samplings: [...(_rangos[0].samplings as Array<SamplingCreateInput>)]
    //       }
    //     ))
    //   )
    // }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };


  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  const handleReset = () => {
    setActiveStep(0);
  };

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const onSubmit: SubmitHandler<RangoUpdateForm> = async (data) => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    await sleep(2000)
    handleClose()
    reset()
    setActiveStep(0);
    // dispatch(addNewRanges(
    //   data.rangos.map((rango) => (
    //     {
    //       ...rango,
    //       status: true,
    //       samplingRanges: (rango?.samplings ?? []).map(samp => (
    //         {
    //           id: samp.samplingRange?.id as string,
    //           numberSamples: samp.samplingRange?.numberSamples as string,
    //           sampling: samp
    //         }))
    //     }
    //   ))
    // ))
  }

  const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setDistanceRangeErrorMsg('');
  };


  const handleAlertMessage = (min: number, max: number) => {
    setDistanceRangeErrorMsg(`${max} (val maximo) debe ser mayor a ${min} (val minimo)`);
  }

  return (

    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
              <CircularProgress />
            </Box>
          </>
        ) : (
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div
                style={{ marginTop: '2rem', marginBottom: '2rem' }}
              >

                {activeStep == PageType.RANGO &&
                  <RangoUpdate
                    useFormHook={useFormHook}
                  />
                }
                {activeStep == PageType.TIPO_MUESTRA &&
                  <TipoMuestraUpdate
                    useFormHook={useFormHook}
                  />
                }
                {activeStep == PageType.RANGO_MUESTRA &&
                  <RangoMuestraUpdate
                    useFormHook={useFormHook}
                  />
                }
              </div>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2 }}>
                {activeStep !== 0 &&
                  <Button
                    variant='outlined'
                    type='button'
                    color="primary"
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    volver
                  </Button>}
                {
                  activeStep !== steps.length ?
                    <Button
                      type={'button'}
                      variant='contained'
                      onClick={handleNext}>
                      {'siguiente'}
                    </Button>
                    :
                    <Button
                      type={'submit'}
                      variant='contained'
                    >
                      {'finalizar'}
                    </Button>
                }
                <Snackbar open={!!distanceRangeErrorMsg} autoHideDuration={4000} onClose={handleCloseAlert}>
                  <Alert onClose={handleCloseAlert} severity="warning" sx={{ width: '100%' }}>
                    {distanceRangeErrorMsg}
                  </Alert>
                </Snackbar>
              </Box>
            </form>
          </>
        )}

      </Box>
    </Modal>
  );
}


const RangoUpdate = (
  { useFormHook
  }: {
    useFormHook: UseFormReturn<RangoUpdateForm, any, undefined>,
  }) => {

  const {
    trigger,
    control,
    getValues,
    formState,
  } = useFormHook;
  return (
    <div>
      <div
        style={{ display: 'flex', gap: '3rem', alignItems: 'flex-end' }}>

        <Controller
          name={`rango.minimum`}
          control={control}
          render={({ field }) =>
            <TextField
              id="standard-basic-v-minimum" label="Valor minimo" variant="standard"
              type='number'
              {...field}
            />
          }
        />
        <Controller
          name={`rango.maximum`}
          control={control}
          render={({ field }) =>
            <TextField
              id="standard-basic-v-maximum" label="Valor minimo" variant="standard"
              type='number'
              {...field}
            />
          }
        />
      </div>
    </div>
  )
}


const TipoMuestraUpdate = ({ useFormHook }: {
  useFormHook: UseFormReturn<RangoUpdateForm, any, undefined>,
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
    name: `rango.samplingRanges` as any
  })


  const _handleRemoveDetail = (index: number) => async () => {
    remove(index)

  }


  const handleAddNames = async () => {
    const isValidNames = await trigger(`rango.samplings`);
    if (isValidNames) {
      append(
        {
          ...INIT_MUESTREO,
          id: (getValues()?.rango.samplings ?? [].length + 1).toString(),
        }
      )
    }
  }

  const handleBlurAction = async (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  ) => {
    // trigger(e.target.name as any);

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
                  name={`rango.samplingRanges.${indexMuestreo}.sampling.name` as any}
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) =>
                    <TextField
                      id="standard-basic-name" label="Nombre" variant="standard"
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
        type='button'
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

const RangoMuestraUpdate = ({ useFormHook }: {
  useFormHook: UseFormReturn<RangoUpdateForm, any, undefined>,
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
  useFormHook: UseFormReturn<RangoUpdateForm, any, undefined>,
}) => {
  const {
    trigger,
    control,
    getValues,
    formState,
  } = useFormHook;

  const range = { ...getValues().rango }

  return (
    <div
      style={{ display: 'flex', gap: '3rem', alignItems: 'flex-end' }}
    >

      <Controller
        disabled
        name={`rango.tempDisplay`}
        control={control}
        defaultValue={`${range.minimum}-${range.maximum}`}
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
          muestreoArr={`range.samplingRanges` as any}
          useFormHook={useFormHook}

        />
      </div>
    </div>
  )

}

const MuestreoComponente = ({
  muestreoArr,
  useFormHook
}: {
  muestreoArr: Array<SamplingCreateInput>,
  useFormHook: UseFormReturn<RangoUpdateForm, any, undefined>,
}) => {

  const {
    watch,
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
                defaultValue={muestreoItem.id}
                name={`rango.samplings.${indexRange}.samplingRange.id`}
                control={control}
                rules={{ required: true }}
                render={({ field }) =>
                  <TextField
                    sx={{ display: 'none' }}
                    id="standard-basic-number-sample123"
                    {...field}
                  />
                }
              />
              <Controller
                defaultValue=''
                name={`rango.samplings.${indexRange}.samplingRange.numberSamples`}
                control={control}
                rules={{ required: true }}
                render={({ field }) =>
                  <TextField
                    id="standard-basic-number-sample" label={muestreoItem.name} variant="standard"
                    type='number'
                    {...field}
                  />
                }
              />
            </div>
          )
        })}
    </>

  );
}



export default UpdateRangoForm;