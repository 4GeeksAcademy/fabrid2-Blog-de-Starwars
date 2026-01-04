export const initialStore = () => {
  return {
    people: [],
    planets: [],
    vehicles: [],
    favorites: [],
    loading: {
      people: false,
      planets: false,
      vehicles: false
    },
    error: null
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {

   
    case "SET_STORE": {
      
      const saved = action.payload;

      
      const fresh = initialStore();

      return {
       
        ...fresh,

        
        ...saved,

        
        loading: fresh.loading,

        
        error: null
      };
    }

    case "SET_LOADING": {
      const { resource, value } = action.payload;
      return {
        ...store,
        loading: {
          ...store.loading,
          [resource]: value
        }
      };
    }

    case "SET_ERROR": {
      return {
        ...store,
        error: action.payload
      };
    }

    case "SET_RESOURCE": {
      const { resource, items } = action.payload;
      return {
        ...store,
        [resource]: items
      };
    }

    case "ADD_FAVORITE": {
      const { uid, type, name } = action.payload;

      const exists = store.favorites.some(
        (fav) => fav.uid === uid && fav.type === type
      );

      if (exists) return store;

      return {
        ...store,
        favorites: [...store.favorites, { uid, type, name }]
      };
    }

    case "REMOVE_FAVORITE": {
      const { uid, type } = action.payload;

      return {
        ...store,
        favorites: store.favorites.filter(
          (fav) => !(fav.uid === uid && fav.type === type)
        )
      };
    }

    case "CLEAR_FAVORITES": {
  return {
    ...store,
    favorites: []
  };
}

    default:
      throw new Error("Unknown action type: " + action.type);
  }
}