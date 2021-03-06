import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducer';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit, OnDestroy {

  nombre: string;
  userSubs$: Subscription;

  constructor(private store: Store<AppState>) { }
  
  ngOnInit(): void {
    this.userSubs$ = this.store.select('user')
      .pipe(
        filter(({user}) => user != null)
      )
      .subscribe(({ user }) => {
      this.nombre = user.nombre;
    });
  }
 
  ngOnDestroy(): void {
    this.userSubs$.unsubscribe();
  }

}
