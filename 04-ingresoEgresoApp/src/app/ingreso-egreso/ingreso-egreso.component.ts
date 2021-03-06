import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { AppState } from '../app.reducer';
import { IngresoEgreso } from '../models/ingreo-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import * as actions from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  ingresoForm: FormGroup;
  tipo: string = 'ingreso';
  cargando: boolean = false;
  uiSubscription: Subscription;

  constructor(private store: Store<AppState>, private fb: FormBuilder, private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit(): void {
    this.uiSubscription = this.store.select('ui').subscribe(({ isLoading }) => this.cargando = isLoading);

    this.ingresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required]
    })
  }

  ngOnDestroy() {
    this.uiSubscription?.unsubscribe();
  }


  guardar() {
    
    this.store.dispatch(actions.isLoading());

    if (this.ingresoForm.invalid) { return; }

    const { descripcion, monto } = this.ingresoForm.value;
    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo);
    this.ingresoEgresoService.crearIngreso(ingresoEgreso).then(() => {
      this.ingresoForm.reset();
      this.store.dispatch(actions.stopLoading());
      Swal.fire('Registro Creado', descripcion, 'success');
    }).catch(error => {
      this.store.dispatch(actions.stopLoading());
      Swal.fire('Error', error.message, 'error');
    });

  }

}
