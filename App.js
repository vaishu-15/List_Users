import React, { useEffect } from 'react';
import Routes from './src/navigation/Routes';
import { Provider } from 'react-redux';
import { store ,persistor} from './src/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import messaging from '@react-native-firebase/messaging';

const App = () => {

   async function requestUserPermission() {
     const authStatus = await messaging().requestPermission();
     const enabled =
       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
       authStatus === messaging.AuthorizationStatus.PROVISIONAL;

     if (enabled) {
       console.log('Authorization status:', authStatus);
     }
   }

   const getToken = async () => {
     const token = await messaging().getToken();
     console.log('token=', token);
   };

   useEffect(() => {
     requestUserPermission();
     getToken();
   }, []);

  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <Routes/>
    </PersistGate>
    </Provider>
  );
};

export default App;