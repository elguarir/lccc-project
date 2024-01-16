import { OutputData } from "@editorjs/editorjs";
import { create } from "zustand";

type ArticleState = {
  saving: boolean;
  setSaving: (saving: boolean) => void;
  articleData: OutputData | undefined;
  setArticleData: (data: OutputData) => void;
};

export const useArticleState = create<ArticleState>((set) => ({
  articleData: undefined,
  saving: false,
  setArticleData: (data) => set({ articleData: data }),
  setSaving: (saving) => set({ saving }),
}));
