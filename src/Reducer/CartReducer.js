import allItem from "../data/allItem";

export const initialState = {
  products: allItem,
  subTotal: 0,
  noFound: false,
};


export function cartReducer(state, action) {
  switch (action.type) {
    case "search": {
      const query = action.value.toLowerCase().trim();
      if (query.length === 0) {
        return { ...state, products: allItem, noFound: false };
      }
      const filtered = allItem.filter((product) =>
        product.title.toLowerCase().includes(query)
      );
      return {
        ...state,
        products: filtered,
        noFound: filtered.length === 0,
      };
    }

    case "sort": {
      const sorted = [...state.products];
      const value = action.value;
      if (value === "Newest") {
        sorted.sort(
          (a, b) => new Date(b.publishDate) - new Date(a.publishDate)
        );
      } else if (value === "Price: Low to High") {
        sorted.sort((a, b) => a.price - b.price);
      } else if (value === "Price: High to Low") {
        sorted.sort((a, b) => b.price - a.price);
      } else if (value === "Most Popular") {
        sorted.sort((a, b) => b.rating - a.rating);
      }
      return { ...state, products: sorted };
    }

    case "increase": {
      let added = false;
      const updated = state.products.map((item) => {
        if (item.id === action.value.id && item.stock > 0) {
          added = true;
          return {
            ...item,
            stock: item.stock - 1,
            inCartCount: item.inCartCount + 1,
          };
        }
        return item;
      });
      return {
        ...state,
        products: updated,
        subTotal: added ? state.subTotal + action.value.price : state.subTotal,
      };
    }

    case "decrease": {
      const updated = state.products.map((item) => {
        if (item.id === action.value.id && item.inCartCount > 0) {
          return {
            ...item,
            stock: item.stock + 1,
            inCartCount: item.inCartCount - 1,
          };
        }
        return item;
      });
      return {
        ...state,
        products: updated,
        subTotal: Math.max(0, state.subTotal - action.value.price),
      };
    }

    case "remove": {
      const updated = state.products.map((item) => {
        if (item.id === action.value.id) {
          return {
            ...item,
            stock: item.stock + item.inCartCount,
            inCartCount: 0,
          };
        }
        return item;
      });
      return {
        ...state,
        products: updated,
        subTotal: Math.max(
          0,
          state.subTotal - action.value.price * action.value.inCartCount
        ),
      };
    }

    case "toggleCart": {
      const updated = state.products.map((item) => {
        if (item.id === action.value.id) {
          if (item.inCartCount === 0 && item.stock > 0) {
            return {
              ...item,
              stock: item.stock - 1,
              inCartCount: 1,
            };
          } else {
            return {
              ...item,
              stock: item.stock + item.inCartCount,
              inCartCount: 0,
            };
          }
        }
        return item;
      });

      const existing = state.products.find((i) => i.id === action.value.id);
      const toggleAdd = existing?.inCartCount === 0;

      return {
        ...state,
        products: updated,
        subTotal: toggleAdd
          ? state.subTotal + action.value.price
          : state.subTotal - (existing?.price || 0) * existing?.inCartCount,
      };
    }

    default:
      return state;
  }
}
