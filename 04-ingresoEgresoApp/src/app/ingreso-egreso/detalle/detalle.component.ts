import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreo-egreso.model';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AppStateWithIngreso } from '../ingreso-egreso.reducers';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresosEgresos: IngresoEgreso[] = [];
  ingresosSubs: Subscription;
  
  constructor(private store: Store<AppStateWithIngreso>, private ingresoEgresoService: IngresoEgresoService) { }
  
  ngOnInit(): void {
    this.ingresosSubs = this.store.select('ingresosEgresos').subscribe(({items}) =>this.ingresosEgresos = items);
  }
  
  ngOnDestroy(): void {
    this.ingresosSubs.unsubscribe();
  }
  
  borrar(uid: string) {
    this.ingresoEgresoService.borrarIngresoEgreso(uid).then(() => {
      Swal.fire('Borrado','Item borrado','success')
    }).catch(error => {
      Swal.fire('Borrado',error.message,'error')
    })
  }

}
