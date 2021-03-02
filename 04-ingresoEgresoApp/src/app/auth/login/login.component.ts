import { ThrowStmt } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import * as Acciones from 'src/app/shared/ui.actions';
import Swal from 'sweetalert2'
import { AppState } from '../../app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  cargando: boolean = false;
  uiSubscription: Subscription;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.uiSubscription = this.store.select('ui').subscribe(({ isLoading }) => {
      this.cargando = isLoading;
    });
  }

  login() {
    if (this.loginForm.invalid) { return; }

    this.store.dispatch(Acciones.isLoading())

    // Swal.fire({
    //   title: 'Espere por favor',
    //   willClose: () => {
    //     Swal.showLoading();
    //   }
    // });

    const { email, password } = this.loginForm.value;
    this.authService.loginUsuario(email, password).then(credenciales => {
      // Swal.close();
      this.store.dispatch(Acciones.stopLoading());
      this.router.navigate(['/']);
    }).catch(error => {
      this.store.dispatch(Acciones.stopLoading());
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      });
    });
  }

}
