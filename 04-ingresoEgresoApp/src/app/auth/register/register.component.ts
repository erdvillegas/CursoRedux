import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import * as Acctions from 'src/app/shared/ui.actions';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {

  registroForm: FormGroup;
  cargando: boolean = false;
  uiSubscription: Subscription;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private store: Store<AppState>) { }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  ngOnInit(): void {

    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.uiSubscription = this.store.select('ui').subscribe(({ isLoading }) => {
      console.log('Registro Subs: ', isLoading);
      this.cargando = isLoading;
    })
  }

  crearUsuario() {

    if (this.registroForm.invalid) { return; }
    this.store.dispatch(Acctions.isLoading());
    const { nombre, correo, password } = this.registroForm.value;

    this.authService.crearUsuario(nombre, correo, password).then(credenciales => {
      this.router.navigate(['/'])
    }).catch(error => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      });
    })
  }

}
