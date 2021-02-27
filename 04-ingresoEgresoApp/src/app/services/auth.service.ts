import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { from } from 'rxjs';
import { map } from "rxjs/operators";
import { Usuario } from '../models/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth, private firestore: AngularFirestore) { }

  initAuthListener() {
    this.auth.authState.subscribe(console.log);
  }

  crearUsuario(nombre: string, email: string, password: string) {

    // Version reactivex
    // return from(this.auth.createUserWithEmailAndPassword(email, password));

    return this.auth.createUserWithEmailAndPassword(email, password).then(({user}) => {
      const newUser = new Usuario(user.uid, nombre, user.email);
      return this.firestore.doc(`${user.uid}/usuario`).set({...newUser});
    });

  }

  /**
   * Inicia sesion con el sistema
   * @param email email
   * @param password password
   */
  loginUsuario(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);

  }

  /**
   * Cerrar sesion
   */
  logOut() {
    return this.auth.signOut();
  }

  /**
   * Valida si el usuario está activado
   */
  isAuth() {
    return this.auth.authState.pipe(
      map(user => user != null)
    );
  }

}