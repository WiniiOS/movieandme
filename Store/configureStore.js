import { createStore } from "redux";
import toggleFavorite from "./Reducers/favoriteReducer";

// creation du state global
export default createStore(toggleFavorite)

