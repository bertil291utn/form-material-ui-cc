import { IsValidRangeDistance } from '@/app/utils/Rango.utils';
import RangoMiniComp from '@/components/Rango';
import RangoMuestraMiniComp from '@/components/RangoMuestraMiniComp';
import TipoMuestraMiniComp from '@/components/TipoMuestraMiniComp';
import { RangoForm } from '@/interfaces/RangoForm';
import { PageType } from '@/interfaces/RangoStep.enum';
import { Alert, Box, Button, Modal, Snackbar, Step, StepButton, StepLabel, Stepper, Typography } from '@mui/material';
import { useState } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';

const steps = ['Rango', 'Tipo muestra', 'Rango muestreo'];


const AddRangoForm = ({ handleClose, open }: {
  handleClose: () => void
  open: boolean
}) => {
  const INIT_RANGOS = {
    id: '1',
    minimum: '',
    maximum: '',
    samplings: [{
      id: '1',
      name: ''
    }]
  }

  const useFormHook = useForm<RangoForm>({
    defaultValues: { rangos: [INIT_RANGOS] }
  });

  const {
    getValues,
    control,
    trigger,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useFormHook;

  const [activeStep, setActiveStep] = useState(0);
  const [distanceRangeErrorMsg, setDistanceRangeErrorMsg] = useState('')



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

  const onSubmit: SubmitHandler<RangoForm> = (data) => console.log(data)

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
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </>
        ) : (
          <>
            <div
              style={{ marginTop: '2rem', marginBottom: '2rem' }}
            >
              <form onSubmit={handleSubmit(onSubmit)}>

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
              </form>
            </div>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2 }}>
              {activeStep !== 0 &&
                <Button
                  variant='outlined'
                  color="primary"
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  volver
                </Button>}
              <Button
                variant='contained'
                onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'finalizar' : 'siguiente'}
              </Button>
              <Snackbar open={!!distanceRangeErrorMsg} autoHideDuration={4000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="warning" sx={{ width: '100%' }}>
                  {distanceRangeErrorMsg}
                </Alert>
              </Snackbar>
            </Box>
          </>
        )}

      </Box>
    </Modal>
  );
}

export default AddRangoForm;