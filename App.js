import React from 'react';
import Routes from './src/navigation/Routes';
// import { Provider } from 'react-redux';
// import { store ,persistor} from './src/store/store';
// import { PersistGate } from 'redux-persist/integration/react';

const App = () => {

  return (
    //  <Provider store={store}>
    // <PersistGate loading={null} persistor={persistor}>
    <Routes/>
    // </PersistGate>
    // </Provider>
  );
};

export default App;