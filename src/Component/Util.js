import { createTheme, styled } from '@mui/material/styles';

export const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

export function ondate(a, b) {
    if (a.createdAt < b.createdAt) {
        return -1;
    }
    else if (a.createdAt > b.createAt) {
        return 1;
    }
    return 0;
}

export const Input = styled('input')({
    display: 'none',
});