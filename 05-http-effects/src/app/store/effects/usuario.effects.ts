import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as usuarioActions from '../actions/usuario.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { UsuarioService } from '../../services/usuario.service';
import { of } from 'rxjs';

@Injectable()
export class UsuarioEffect {

  constructor(private actions$: Actions, private usuarioServices: UsuarioService) { }

  cargarUsuario$ = createEffect(
    () => this.actions$.pipe(
      ofType(usuarioActions.cargarUsuario),
      mergeMap(
        (action) => this.usuarioServices.getUserById(action.id).pipe(
          map(user => usuarioActions.cargarUsuarioSuccess({ usuario: user })),
          catchError(err => of(usuarioActions.cargarUsuarioError({ payload: err }))))
      )
    )
  );
}