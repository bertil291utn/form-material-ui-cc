import { Box, Modal } from '@mui/material';

const AddRangoForm = ({ handleClose, open }: {
  handleClose: () => void
  open: boolean
}) => {
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
        <span>this is a form</span>
      </Box>
    </Modal>
  );
}

export default AddRangoForm;