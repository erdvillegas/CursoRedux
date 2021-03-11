import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { UsuariosModule } from '../usuarios.module';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: [
  ]
})
export class ListaComponent implements OnInit {

  usuarios: UsuariosModule[];

  constructor(public usuariosService: UsuarioService) { }

  ngOnInit(): void {
    this.usuariosService.getUsers().subscribe(users=>{this.usuarios = users});
  }

}
