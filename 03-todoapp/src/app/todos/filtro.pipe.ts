import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from './models/todo.model';
import { filtrosValidos } from '../filtro/filtro.actions';

@Pipe({
  name: 'filtroTodo'
})
export class FiltroPipe implements PipeTransform {

  transform(todos: Todo[], filtro: filtrosValidos): Todo[] {

    console.log({ todos });
    console.log(filtro);

    switch (filtro) {
      case 'completados':
        return todos.filter(({completado})=>completado);
      
      case 'pendientes':
        return todos.filter(({ completado }) => !completado)
      
      default:
        return todos;
    }
  }

}
