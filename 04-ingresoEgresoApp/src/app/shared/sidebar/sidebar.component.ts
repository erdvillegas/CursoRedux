import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducer';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {

  nombre: string;
  userSubs$: Subscription;

  constructor(private store:Store<AppState>, private authService: AuthService, private router: Router) { }
  
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
    this.userSubs$?.unsubscribe();
  }
  
  logout() {
    this.authService.logOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

}
