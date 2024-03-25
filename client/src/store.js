import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // Assurez-vous d'avoir vos reducers configurés

const store = configureStore({
  reducer: rootReducer,
  // Autres configurations de store peuvent être ajoutées ici
});

export default store;
