import { createSlice } from "@reduxjs/toolkit";

const favouriteCarSlice = createSlice({

  name: "favouriteCars",

  initialState:
    JSON.parse(
      localStorage.getItem("favouriteCars")
    ) || [],

  reducers: {

    addFavouriteCar: (state, action) => {

      const exists = state.find(
        (car) => car.id === action.payload.id
      );

      if (!exists) {

        state.push(action.payload);

        localStorage.setItem(
          "favouriteCars",
          JSON.stringify(state)
        );

      }

    },


    removeFavouriteCar: (state, action) => {

      const updatedCars =
        state.filter(
          (car) => car.id !== action.payload
        );

      localStorage.setItem(
        "favouriteCars",
        JSON.stringify(updatedCars)
      );

      return updatedCars;

    }

  }

});


export const {
  addFavouriteCar,
  removeFavouriteCar
} = favouriteCarSlice.actions;


export default favouriteCarSlice.reducer;