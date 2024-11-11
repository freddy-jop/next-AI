import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartStoreType = {
  card: string[];
  toggleCard: (id: string) => void;
  toggleFavorite: (id: string) => void;
  favorite: string[];
};

export const useCartStore = create(
  persist<CartStoreType>(
    (set) => ({
      card: [],
      favorite: [],
      toggleCard: (id) =>
        set((state) => ({
          card: state.card.includes(id)
            ? state.card.filter((i) => i !== id)
            : [...state.card, id],
        })),
      toggleFavorite: (id) =>
        set((state) => ({
          favorite: state.favorite.includes(id)
            ? state.favorite.filter((i) => i !== id)
            : [...state.favorite, id],
        })),
    }),
    {
      name: "card-store",
    }
  )
);

export const deleteCard = (id: string) => {
  useCartStore.setState((state) => ({
    card: state.card.filter((i) => i !== id),
  }));
};
