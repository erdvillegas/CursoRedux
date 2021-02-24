import { createAction, props } from '@ngrx/store';


export const crear = createAction(
  '[TODO] Crear Todo',
  props<{ texto: string }>()
);

export const toggleAll = createAction(
  '[TODO] Toggle All Todo',
  props<{ completado: boolean }>()
);

export const toggle = createAction(
  '[TODO] Toggle Todo',
  props<{ id: string }>()
);

export const editar = createAction(
  '[TODO] Editar Todo',
  props<{ id: string, texto: string }>()
);

export const borrar = createAction(
  '[TODO] Borrar Todo',
  props<{ id: string }>()
);

export const limpiarCompletados = createAction('[TODO] Limpiar Completados Todo');