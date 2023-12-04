import { createStore } from 'redux';
import { contactsReducer } from './Redux/Reducers/contacts';
export const store = createStore(contactsReducer);