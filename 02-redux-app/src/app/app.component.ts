import { ThrowStmt } from '@angular/compiler';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  contador: number;
  title = 'redux-app';

  constructor() {
    this.contador = 10;
  }

  incrementar() {
    this.contador += 1;
  }

  decrementar() {
    this.contador -= 1;
  }
}
