import { Amplify } from 'aws-amplify';
import Mainpage from './Component/Mainpage';

// import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

function App() {
  return (
    <>
      <Mainpage />
    </>
  );
}

export default App;
