import React, { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';

export default function SimpleSnackbar(props) {
  const [open, setOpen] = useState(props.open);

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    props.setOpen();
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={`${props.text}`}
        action={action}
      />
    </div>
  );
}
