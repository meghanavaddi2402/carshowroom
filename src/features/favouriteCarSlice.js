import { createSlice } from "@reduxjs/toolkit";


// ========================================
// GET CURRENT USER'S FAVOURITE STORAGE KEY
// ========================================

function getFavouriteKey() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || !user.email) {
    return null;
  }

  return `carvista_favourites_${user.email
    .trim()
    .toLowerCase()}`;
}


// ========================================
// LOAD CURRENT USER'S FAVOURITES
// ========================================

function loadFavouriteCars() {
  const key = getFavouriteKey();

  if (!key) {
    return [];
  }

  const savedFavourites = localStorage.getItem(key);

  return savedFavourites
    ? JSON.parse(savedFavourites)
    : [];
}


// ========================================
// REDUX SLICE
// ========================================

const favouriteCarSlice = createSlice({
  name: "favouriteCars",

  initialState: loadFavouriteCars(),

  reducers: {

    // ========================================
    // LOAD FAVOURITES INTO REDUX
    // ========================================

    setFavouriteCars: (state, action) => {
      return action.payload;
    },


    // ========================================
    // ADD FAVOURITE
    // ========================================

    addFavouriteCar: (state, action) => {

      const exists = state.find(
        car => car.id === action.payload.id
      );

      if (!exists) {

        state.push(action.payload);

        const key = getFavouriteKey();

        if (key) {
          localStorage.setItem(
            key,
            JSON.stringify(state)
          );
        }
      }
    },


    // ========================================
    // REMOVE FAVOURITE
    // ========================================

    removeFavouriteCar: (state, action) => {

      const updatedFavourites = state.filter(
        car => car.id !== action.payload
      );

      const key = getFavouriteKey();

      if (key) {
        localStorage.setItem(
          key,
          JSON.stringify(updatedFavourites)
        );
      }

      return updatedFavourites;
    },


    // ========================================
    // CLEAR REDUX WHEN LOGGING OUT
    // ========================================

    clearFavouriteCars: () => {
      return [];
    }

  }
});


// ========================================
// EXPORT REDUX ACTIONS
// ========================================

export const {
  setFavouriteCars,
  addFavouriteCar,
  removeFavouriteCar,
  clearFavouriteCars
} = favouriteCarSlice.actions;


// ========================================
// EXPORT REDUCER
// ========================================

export default favouriteCarSlice.reducer;