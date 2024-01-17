import { IsValidRangeDistance } from '@/utils/Rango.utils';
import { sleep } from '@/utils/sleep';
import RangoMiniComp from '@/components/Rango';
import RangoMuestraMiniComp from '@/components/RangoMuestraMiniComp';
import TipoMuestraMiniComp from '@/components/TipoMuestraMiniComp';
import { RangeCreateInput, RangoForm, SamplingCreateInput, SamplingRangeCreateInput } from '@/interfaces/RangoForm';
import { PageType } from '@/interfaces/RangoStep.enum';
import { Alert, Box, Button, CircularProgress, Modal, Snackbar, Step, StepButton, StepLabel, Stepper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addNewRanges } from '@/redux/Range.reducer';
import { RangeFormSelector } from '@/redux/selectors';
import { Range } from '@/interfaces/Range';

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


const AddRangoForm = ({ handleClose, open }: {
  handleClose: () => void
  open: boolean
}) => {
  const _rangos = useSelector(RangeFormSelector)

  const INIT_RANGOS = generateInitRangos(_rangos);
  const useFormHook = useForm<RangoForm>({
    defaultValues: { rangos: [INIT_RANGOS] }
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
    setValue('rangos', [INIT_RANGOS]);
  }, [_rangos, setValue]);

  const [activeStep, setActiveStep] = useState(0);
  const [distanceRangeErrorMsg, setDistanceRangeErrorMsg] = useState('')



  const dispatch = useDispatch()

  const handleNext = async () => {
    const isValidRangos = await trigger("rangos");
    const isValidNames = await trigger(`rangos.0.samplings`);
    const min = Number(getValues().rangos[getValues().rangos.length - 1].minimum);
    const max = Number(getValues().rangos[getValues().rangos.length - 1].maximum);
    if (!IsValidRangeDistance({ min, max })) {
      handleAlertMessage(min, max)
      return;
    }
    if (!isValidRangos || !isValidNames) { return; }

    if (activeStep == PageType.TIPO_MUESTRA) {
      const _rangos = [...getValues().rangos]
      setValue("rangos",
        _rangos.map((rango: RangeCreateInput) => (
          {
            ...rango,
            samplings: [...(_rangos[0].samplings as Array<SamplingCreateInput>)]
          }
        ))
      )
    }


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

  const onSubmit: SubmitHandler<RangoForm> = async (data) => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    await sleep(2000)
    handleClose()
    reset()
    setActiveStep(0);
    dispatch(addNewRanges(
      data.rangos.map((rango) => (
        {
          ...rango,
          status: true,
          samplingRanges: (rango?.samplings ?? []).map(samp => {
            const { samplingRange, ...restSamp } = samp;
            return {
              id: samp.samplingRange?.id as string,
              numberSamples: samp.samplingRange?.numberSamples as string,
              sampling: restSamp
            }
          })
        }
      ))
    ))
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
                  <RangoMiniComp
                    useFormHook={useFormHook}
                    handleAlertMessage={handleAlertMessage}
                  />
                }
                {activeStep == PageType.TIPO_MUESTRA &&
                  <TipoMuestraMiniComp
                    useFormHook={useFormHook}
                  />
                }
                {activeStep == PageType.RANGO_MUESTRA &&
                  <RangoMuestraMiniComp
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
                {activeStep !== steps.length - 1 ?
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

export default AddRangoForm;