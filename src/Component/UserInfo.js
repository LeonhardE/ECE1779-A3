import * as React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from '../aws-exports';
Amplify.configure(awsExports);

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });


function UserInfo({ user }) {
    return (
        <ThemeProvider theme={darkTheme}>
            <Box
            sx={{
                bgcolor: 'background.paper',
                pt: 8,
                pb: 6,
            }}
            >
            <Container maxWidth="sm">
                <Typography
                variant="h3"
                color="text.primary"
                gutterBottom
                >
                User Profile
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom >
                Username: {user.username}
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom > 
                Email: {user.attributes.email}
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom >
                Verified: {user.attributes.email_verified.toString()}
                </Typography>
                <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
                >
                </Stack>
            </Container>
            </Box>
            <Container sx={{ py: 8 }} maxWidth="md">
            
            </Container>
        </ThemeProvider>
    )
}

export default withAuthenticator(UserInfo);