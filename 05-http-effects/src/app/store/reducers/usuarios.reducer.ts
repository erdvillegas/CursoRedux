import { createReducer, on } from '@ngrx/store';

import { Usuario } from '../../models/usuario.model';
import { cargarUsuarios, cargarUsuariosError, cargarUsuariosSuccess } from '../actions';

export interface UsuariosInitialState {
  users: Usuario[],
  loading: boolean,
  loaaded: boolean,
  error: any,
}

export const initialState: UsuariosInitialState = {
  users: [],
  loading: false,
  loaaded: false,
  error: null,
}

const _usuariosReducer = createReducer(initialState,

  on(cargarUsuarios, state => ({ ...state, loading: true })),
  on(cargarUsuariosSuccess, (state, { usuarios}) => ({
    ...state,
    loading: false,
    loaaded: true,
    users: [...usuarios]
  })),
  on(cargarUsuariosError, (state, { payload}) => ({
    ...state,
    loading: false,
    loaaded: false,
    error: {
      url: payload.url,
      name: payload.name,
      message: payload.message
    }
  })),

);

export function usuariosReducer(state, action) {
  return _usuariosReducer(state, action);
}