import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { map } from "rxjs/operators";
import { Usuario } from '../models/usuario.model';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import * as authActions from '../auth/auth.actions';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription: Subscription;

  constructor(private store: Store<AppState>, public auth: AngularFireAuth, private firestore: AngularFirestore) { }

  initAuthListener() {
    this.auth.authState.subscribe(fuser => {
      if (fuser) {
        this.userSubscription = this.firestore.doc(`${fuser.uid}/usuario`).valueChanges().subscribe((firestoreUser: any) => {
          console.log(firestoreUser);
          const user = Usuario.fromFirebase(firestoreUser);
          this.store.dispatch(authActions.setUser({ user: user }));
        });
      } else {
        this.userSubscription.unsubscribe();
        this.store.dispatch(authActions.unsetUser());
      }
    });
  }

  crearUsuario(nombre: string, email: string, password: string) {

    // Version reactivex
    // return from(this.auth.createUserWithEmailAndPassword(email, password));

    return this.auth.createUserWithEmailAndPassword(email, password).then(({ user }) => {
      const newUser = new Usuario(user.uid, nombre, user.email);
      return this.firestore.doc(`${user.uid}/usuario`).set({ ...newUser });
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