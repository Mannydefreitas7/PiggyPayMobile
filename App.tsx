import React from 'react';

import {Start} from './app/screens';
import tailwind, {useDeviceContext} from 'twrnc';
import {NativeBaseProvider} from 'native-base';

function App(): React.JSX.Element {
  useDeviceContext(tailwind);

  return (
    <NativeBaseProvider>
      <Start />
    </NativeBaseProvider>
  );
}

export default App;
