import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from '../models/ingreo-egreso.model';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(private firestore: AngularFirestore, private authService: AuthService) { }

  crearIngreso(ingresoEgreso: IngresoEgreso) {

    const { uid } = this.authService.user;
    delete ingresoEgreso.uid;

    return this.firestore.doc(`${uid}/ingresos-egresos`).collection('items').add({ ...ingresoEgreso })
      .then(ref => {
      }).catch(err => { console.log(err) });
  }

  initIngresosEgresosListener(uid: string) {
    return this.firestore.doc(`${uid}/ingresos-egresos`).collection('items')
      .snapshotChanges()
      .pipe(
        map(snapshot => snapshot.map(doc => ({
          uid: doc.payload.doc.id,
          ...doc.payload.doc.data() as any
        })
        ),
        )
      );
  }

  borrarIngresoEgreso(uidItem: string) {
    const { uid } = this.authService.user;
    return this.firestore.doc(`${uid}/ingresos-egresos/items/${uidItem}`).delete();
  }
}
