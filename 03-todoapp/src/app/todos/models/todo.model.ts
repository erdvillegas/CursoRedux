import { v4 as uuidv4 } from 'uuid';


export class Todo {
  public id: string;
  public texto: string;
  public completado: boolean;

  constructor(texto: string) {
    this.texto = texto;
    this.id = uuidv4();
    this.completado = false;
  }
}