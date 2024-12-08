import Snackbar, { SnackbarCloseReason, SnackbarOrigin } from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { useState } from 'react'


interface State extends SnackbarOrigin {
    open: boolean
}

export const AlertBar = ({msg, snackBarState} : {msg: string, snackBarState: State}) => {


    const { vertical, horizontal, open } = snackBarState

    // const handleClose = (event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    //     if (reason === 'clickaway') {
    //         return;
    //     }

    //     setSnackBarState({ ...snackBarState, open: false })
    // }


    return <Snackbar open={open} autoHideDuration={1500} anchorOrigin={{ vertical, horizontal }} key={"top" + "center"}>
        <Alert severity="success" variant="filled" sx={{ width: '100%' }}>
            {msg}
        </Alert>
    </Snackbar>
}
