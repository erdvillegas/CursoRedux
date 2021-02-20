import { ThrowStmt } from '@angular/compiler';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actions from './contador/contador.actions';

interface AppState {
  contador: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  contador: number;
  title = 'redux-app';

  constructor(private store: Store<AppState>) {
    // this.contador = 10;

    this.store.subscribe(state => {
      console.log({ state });
      this.contador = state.contador;
    });
    
  }

  // incrementar() {
  //   this.contador += 1;
  // }

  // decrementar() {
  //   this.contador -= 1;
  // }

  incrementar() {
    this.store.dispatch(actions.incrementar());
  }

  decrementar() {
    this.store.dispatch(actions.decrementar());
  }
}
