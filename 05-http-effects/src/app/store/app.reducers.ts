import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './reducers';
import { UsuariosInitialState, usuariosReducer } from './reducers/usuarios.reducer';
import { UsuarioInitialState, usuarioReducer } from './reducers/usuario.reducer';


export interface AppState {
   usuarios: UsuariosInitialState,
   usuario: UsuarioInitialState,
}



export const appReducers: ActionReducerMap<AppState> = {
   usuarios: usuariosReducer,
   usuario: usuarioReducer
}