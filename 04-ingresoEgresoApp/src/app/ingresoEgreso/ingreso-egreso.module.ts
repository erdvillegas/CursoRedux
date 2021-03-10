import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';

import { ReactiveFormsModule } from '@angular/forms';


//Componentes
import { DashboardComponent } from '../dashboard/dashboard.component';
import { IngresoEgresoComponent } from '../ingreso-egreso/ingreso-egreso.component';
import { EstadisticaComponent } from '../ingreso-egreso/estadistica/estadistica.component';
import { DetalleComponent } from '../ingreso-egreso/detalle/detalle.component';
import { OrdenIngresoPipe } from '../pipes/orden-ingreso.pipe';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';
import { StoreModule } from '@ngrx/store';
import { ingresoEgresoReducer } from '../ingreso-egreso/ingreso-egreso.reducers';



@NgModule({
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    OrdenIngresoPipe
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('ingresosEgresos',ingresoEgresoReducer),
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    DashboardRoutesModule
  ]
})
export class IngresoEgresoModule { }
