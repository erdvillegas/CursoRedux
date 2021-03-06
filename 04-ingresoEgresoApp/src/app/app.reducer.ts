import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reduccer';
import * as auth from './auth/auth.reducer';
import * as ingresoEreso from './ingreso-egreso/ingreso-egreso.reducers';


export interface AppState {
   ui: ui.State;
   user: auth.State;
   ingresosEgresos: ingresoEreso.State;
}



export const appReducers: ActionReducerMap<AppState> = {
   ui: ui.uiReducer,
   user: auth.authReducer,
   ingresosEgresos: ingresoEreso.ingresoEgresoReducer
}