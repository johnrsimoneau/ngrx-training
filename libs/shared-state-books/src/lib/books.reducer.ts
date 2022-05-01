import { createReducer, on, Action, createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { BookModel, calculateBooksGrossEarnings } from '@book-co/shared-models';
import { BooksPageActions, BooksApiActions } from '@book-co/books-page/actions';

const createBook = (books: BookModel[], book: BookModel) => [...books, book];
const updateBook = (books: BookModel[], changes: BookModel) =>
  books.map((book) => {
    return book.id === changes.id ? Object.assign({}, book, changes) : book;
  });
const deleteBook = (books: BookModel[], bookId: string) =>
  books.filter((book) => bookId !== book.id);

export interface State {
  collection: BookModel[];
  activeBookId: string | null;
}

export const initialState: State = {
  collection: [],
  activeBookId: null
};

export const reducer = createReducer(
  initialState,
  on(
    BooksPageActions.clearSelectedBook,
    BooksPageActions.enter, (state) => {
      return {
        ...state,
        activeBookId: null
      }
    }
  ),
  on(BooksPageActions.selectBook, (state, action) => {
    return {
      ...state,
      activeBookId: action.bookId
    }
  }),
  on(BooksApiActions.booksLoaded, (state, action) => {
    return {
      ...state,
      collection: action.books
    }
  }),
  on(BooksApiActions.bookCreated, (state, action) => {
    return {
      collection: createBook(state.collection, action.book),
      activeBookId: null
    }
  }),
  on(BooksApiActions.bookDeleted, (state, action) => {
    return {
      ...state,
      collection: deleteBook(state.collection, action.bookId)
    }
  })
)

// Instructor likes to keeps selectors and reducers in the same file
// thought is: there's a connection between the state - because they're
// still related

export const selectAll = (state: State) => state.collection;
export const selectActiveBookId = (state: State) => state.activeBookId;

/*
export const selectActiveBook_bad_performance = (state: State) => {
  const books = selectAll(state);
  const activeBookId = selectActiveBookId(state);
  return books.find(book => book.id === activeBookId) || null;
};
*/

// the createSelector function gives better performance than the function above as it
// it updates when any of the inputs change (i.e. the selectAll and/or selectActiveBookId)
export const selectActiveBook = createSelector(
  selectAll,
  selectActiveBookId,
  // below is a callback function - projector function
  // first param is the selectAll, second param is the selectedBookId
  (books, activeBookId) => {
    return books.find(book => book.id === activeBookId) || null;
  }
);

/*

Below is the long hand way, we're creating the projector function by hand.
We can do below this greyed out example - which is a more succinct way to write
the same thing

export const selectEarningsTotals = createSelector(selectAll, (books) => {
  return calculateBooksGrossEarnings(books);
});
*/
export const selectEarningsTotals = createSelector(
  selectAll,
  calculateBooksGrossEarnings
);