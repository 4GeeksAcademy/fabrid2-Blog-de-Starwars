import { useContext, useReducer, createContext, useEffect } from "react";
import storeReducer, { initialStore } from "../store";

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [store, dispatch] = useReducer(storeReducer, initialStore());

 
  useEffect(() => {
    try {
      const raw = localStorage.getItem("sw_store");
      if (raw) {
        const parsed = JSON.parse(raw);
        dispatch({ type: "SET_STORE", payload: parsed });
      }
    } catch (err) {
      localStorage.removeItem("sw_store");
      console.error("localStorage corrupto, eliminado:", err);
    }
  }, []);

  
  useEffect(() => {
    const toSave = {
      people: store.people,
      planets: store.planets,
      vehicles: store.vehicles,
      favorites: store.favorites,
    };

    localStorage.setItem("sw_store", JSON.stringify(toSave));
  }, [store.people, store.planets, store.vehicles, store.favorites]);

  const actions = {
    setLoading: (resource, value) => {
      dispatch({ type: "SET_LOADING", payload: { resource, value } });
    },

    setError: (message) => {
      dispatch({ type: "SET_ERROR", payload: message });
    },

    setResource: (resource, items) => {
      dispatch({ type: "SET_RESOURCE", payload: { resource, items } });
    },

    addFavorite: ({ uid, type, name }) => {
      dispatch({ type: "ADD_FAVORITE", payload: { uid, type, name } });
    },

    removeFavorite: ({ uid, type }) => {
      dispatch({ type: "REMOVE_FAVORITE", payload: { uid, type } });
    },

    isFavorite: ({ uid, type }) => {
      return store.favorites.some((fav) => fav.uid === uid && fav.type === type);
    }, 
    clearFavorites: () => {
      dispatch({ type: "CLEAR_FAVORITES" });
    },
  };

  return (
    <StoreContext.Provider value={{ store, actions }}>
      {children}
    </StoreContext.Provider>
  );
}

export default function useGlobalReducer() {
  return useContext(StoreContext);
}