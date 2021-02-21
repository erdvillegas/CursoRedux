import { ThrowStmt } from '@angular/compiler';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './app.reducers';
import * as actions from './contador/contador.actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  contador: number;
  title = 'redux-app';

  constructor(private store: Store<AppState>) {
    this.store.select('contador').subscribe(contrador => this.contador = contrador);
  }
  
  incrementar() {
    this.store.dispatch(actions.incrementar());
  }

  decrementar() {
    this.store.dispatch(actions.decrementar());
  }
  
}
