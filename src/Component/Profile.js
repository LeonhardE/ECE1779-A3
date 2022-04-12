import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TopBar from './TopBar';
import Footer from './Footer';
import UserInfo from './UserInfo';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from '../aws-exports';
Amplify.configure(awsExports);

const theme = createTheme();

function Profile() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TopBar />
      <main>
        {/* Content */}
        <UserInfo />
      </main>
      {/* Footer */}
      <Footer />
      {/* End footer */}
    </ThemeProvider>
  );
}

export default withAuthenticator(Profile);