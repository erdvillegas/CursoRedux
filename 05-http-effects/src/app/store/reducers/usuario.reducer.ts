import { createReducer, on } from '@ngrx/store';

import { Usuario } from '../../models/usuario.model';
import { cargarUsuario, cargarUsuarioError, cargarUsuarioSuccess } from '../actions';

export interface UsuarioInitialState {
  id: string,
  user: Usuario,
  loading: boolean,
  loaaded: boolean,
  error: any,
}

export const initialState: UsuarioInitialState = {
  id: null,
  user: null,
  loading: false,
  loaaded: false,
  error: null,
}

const _usuarioReducer = createReducer(initialState,

  on(cargarUsuario, (state, { id }) => ({
    ...state,
    loading: true,
    id: id
  })),


  on(cargarUsuarioSuccess, (state, { usuario}) => ({
    ...state,
    loading: false,
    loaaded: true,
    user: {...usuario}
  })),

  on(cargarUsuarioError, (state, { payload}) => ({
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

export function usuarioReducer(state, action) {
  return _usuarioReducer(state, action);
}