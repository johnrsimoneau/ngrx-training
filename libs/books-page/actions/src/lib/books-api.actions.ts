import { createAction, props } from '@ngrx/store';
import { BookModel } from '@book-co/shared-models';

// NOTE you would also add a Failure action
// not doing it in the demo to save time
export const booksLoaded = createAction(
  '[Books API] Books Loaded Success',
  props<{ books: BookModel }>()
);

export const bookCreated = createAction(
  '[Books API] Book Created Success',
  props<{ book: BookModel }>()
);

export const bookUpdated = createAction(
  '[Books API] Book Updated Success',
  props<{ book: BookModel}>()
);

export const bookDeleted = createAction(
  'Books API] Book Deleted Success',
  props<{ bookId: string}>()
);
 