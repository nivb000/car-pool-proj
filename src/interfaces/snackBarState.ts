// snackBarState.ts
import { useState } from 'react';

interface State {
  open: boolean;
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
}

let snackBarMsg = '';
let snackBarState: State = {
  open: false,
  vertical: 'top',
  horizontal: 'center',
};

let setSnackBarMsg: (msg: string) => void;
let setSnackBarState: (state: State) => void;

export const useSnackBarState = () => {
  const [message, setMessage] = useState('');
  const [state, setState] = useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  snackBarMsg = message;
  snackBarState = state;
  setSnackBarMsg = setMessage;
  setSnackBarState = setState;
};

// Export the state and functions
export { snackBarMsg, snackBarState, setSnackBarMsg, setSnackBarState }
