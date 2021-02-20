import { createStore, Store } from 'redux';
import { contadorReducer } from './ngrx-fake/contador/contador.reducer';
import { incrementadorAction } from './ngrx-fake/contador/contador.actions';


const store: Store = createStore(contadorReducer);

store.subscribe(() => {
  console.log('Subs:', store.getState());
});

store.dispatch(incrementadorAction);