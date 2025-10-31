import { create } from "zustand";

export interface CategoryProps {
  name: string;
  id: string;
}

interface CategoryModalProps {
  category: CategoryProps | undefined;
  setCategory: (category: CategoryProps | undefined) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const useCategories = create<CategoryModalProps>((set) => ({
  open: false,
  setOpen: (open: boolean) => set({ open }),
  category: undefined,
  setCategory: (category: CategoryProps | undefined) => set({ category }),
}));
