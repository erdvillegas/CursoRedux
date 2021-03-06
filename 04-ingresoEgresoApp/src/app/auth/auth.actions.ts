import { createAction, props } from '@ngrx/store';
import { Usuario } from '../models/usuario.model';

/**
 * Asigna un usado
 */
export const setUser = createAction(
  '[Auth] setUser',
  props<{ user: Usuario }>()
);


/**
 * Desasigna un usuario
 */
export const unsetUset = createAction('[Auth] unsetUser');