import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import TopBar from './TopBar';
import Footer from './Footer';
import UserPost from './UserPost';
import { Amplify } from 'aws-amplify';
import { darkTheme} from './Util'
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from '../aws-exports';
Amplify.configure(awsExports);

function Manage() {

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <TopBar />
      <main>
        {/* Content */}
        <UserPost />
      </main>
      {/* Footer */}
      <Footer />
      {/* End footer */}
    </ThemeProvider>
  );
}

export default withAuthenticator(Manage);