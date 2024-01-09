import RangoMiniComp from '@/components/Rango';
import RangoMuestraMiniComp from '@/components/RangoMuestraMiniComp';
import TipoMuestraMiniComp from '@/components/TipoMuestraMiniComp';
import { Box, Button, Modal, Step, StepButton, StepLabel, Stepper, Typography } from '@mui/material';
import { useState } from 'react';

const steps = ['Rango', 'Tipo muestra', 'Rango muestreo'];


const AddRangoForm = ({ handleClose, open }: {
  handleClose: () => void
  open: boolean
}) => {

  const [activeStep, setActiveStep] = useState(0);



  const handleNext = () => {

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
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

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
            {activeStep == 0 &&
              <RangoMiniComp />
            }
            {activeStep == 1 &&
              <TipoMuestraMiniComp />
            }
            {activeStep == 2 &&
              <RangoMuestraMiniComp />
            }
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
            </Box>
          </>
        )}

      </Box>
    </Modal>
  );
}

export default AddRangoForm;