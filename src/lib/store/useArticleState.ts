import { create } from "zustand";

type ArticleState = {
  title: string;
  setTitle: (title: string) => void;
};

export const useArticleState = create<ArticleState>((set) => ({
  title: "",
  setTitle: (title) => set({ title }),
}));
