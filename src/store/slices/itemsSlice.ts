import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { CardItem } from "../../service/supermarketApp";
import ky from "ky";

interface InitialStateInterface {
  items: CardItem[];
  cartItems: CardItem[];
  status: string | null;
  error: string | null;
  showModal: boolean;
  countItemsInCart: number;
}

export const getItems = createAsyncThunk<CardItem[], void>(
  "items/getItems",
  async () => {
    const data = await ky
      .get(
        "https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json"
      )
      .json();

    if (!Array.isArray(data)) {
      throw new Error("Invalid data format");
    }

    return data.map((item: Omit<CardItem, "count">) => ({
      ...item,
      count: 0,
    }));
  }
);

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    items: [],
    cartItems: [],
    status: null,
    error: null,
    showModal: false,
    countItemsInCart: 0,
  } as InitialStateInterface,
  reducers: {
    counterItemsInCart(state, action) {
      const { number } = action.payload;
      state.countItemsInCart = number;
    },
    clickModal(state) {
      state.showModal = !state.showModal;
    },
    clickStepper(state, action) {
      const { id, act } = action.payload;
      const newItems = state.items.map((item) => {
        if (id === item.id) {
          if (act === "minus" && item.count > 0) {
            item.count -= 1;
          } else if (act === "plus") {
            item.count += 1;
          }
        }
        return item;
      });
      state.items = newItems;
    },
    clickStepperInCart(state, action) {
      const { id, act } = action.payload;
      const newCart = state.cartItems.map((item) => {
        if (item.id === id) {
          if (act === "minus" && item.count !== 0) {
            item.count -= 1;
          } else if (act === "plus") {
            item.count += 1;
          }
        }
        return item;
      });
      state.cartItems = newCart;
    },
    addCart(state, action) {
      const { id } = action.payload;

      const itemToAdd = state.items.find((item) => item.id === id);
      if (!itemToAdd || itemToAdd.count === 0) return;

      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem) {
        state.cartItems = state.cartItems.map((item) =>
          item.id === id
            ? { ...item, count: item.count + itemToAdd.count }
            : item
        );
      } else {
        state.cartItems = [...state.cartItems, { ...itemToAdd }];
      }

      state.items = state.items.map((item) =>
        item.id === id ? { ...item, count: 0 } : item
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getItems.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.status = "resolved";
        if (action.payload) state.items = action.payload;
      })
      .addCase(getItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      });
  },
});

export const {
  clickStepper,
  addCart,
  clickStepperInCart,
  clickModal,
  counterItemsInCart,
} = itemsSlice.actions;
export default itemsSlice.reducer;
