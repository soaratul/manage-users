import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ConfirmDialog(props) {
  const {
    title,
    closeButtonText,
    okButtonText,
    text,
    okHandler,
    shouldOpen,
    onClose
  } = props;

  return (
    <div>
      <Dialog
        open={shouldOpen}
        onClose={onClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
        {text && (
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              {text}
            </DialogContentText>
          </DialogContent>
        )}

        <DialogActions>
          <Button onClick={onClose}>{closeButtonText || 'Close'}</Button>
          <Button variant='contained' onClick={okHandler}>
            {okButtonText || 'Yes'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
