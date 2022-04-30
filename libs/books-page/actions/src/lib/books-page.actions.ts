import { createAction, props } from '@ngrx/store';
import { BookRequiredProps } from '@book-co/shared-models';

export const enter = createAction('[Books Page] Enter ');

// props - when the user selects a book, we're going to want to know what the id of the book is that they selected
export const selectBook = createAction(
  '[Books Page] Select a book', 
  props<{ bookId: string}>()
);

export const clearSelectedBook = createAction('[Books Page] Clear selected book');

export const createBook = createAction(
  '[Books Page] Create book',
  props<{ book: BookRequiredProps}>()
);

export const updateBook = createAction(
  '[Books Page] Update book',
  props<{ bookId: string, changes: BookRequiredProps }>()
);

export const deleteBook = createAction(
  '[Books Page] Delete book',
  props<{ bookId: string }>()
);