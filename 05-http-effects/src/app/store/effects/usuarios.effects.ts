import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, map } from 'rxjs/operators';
import { UsuarioService } from "src/app/services/usuario.service";
import * as usuariosActions from '../actions/usuarios.actions';
import { cargarUsuarios } from '../actions/usuarios.actions';


@Injectable()
export class UsuariosEffect {

  constructor(private actions$: Actions, private usuariosServices: UsuarioService) { }

  cargarUsuario$ = createEffect(
    () => this.actions$.pipe(
      ofType(usuariosActions.cargarUsuarios),
      mergeMap(
        (action) => this.usuariosServices.getUsers().pipe(
          map(users => usuariosActions.cargarUsuariosSuccess({ usuarios: users }))
        )
      )
    )
  );


}