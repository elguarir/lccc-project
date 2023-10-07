"use client";
import { ArticleByIdType } from "@/types/article";
import axios from "axios";
import { create } from "zustand";

type EditorStore = {
  article: ArticleByIdType;
  saving: boolean;
  setSaving: (saving: boolean) => void;
  setArticle: (article: ArticleByIdType) => void;
  setCoverImage: (image: string | null) => void;
  saveArticle: () => void;
  syncArticle: () => void;
};

export const useEditorStore = create<EditorStore>((set, get) => ({
  article: null,
  saving: false,
  setSaving: (saving) => set({ saving }),
  setArticle: (article) => set({ article }),
  setCoverImage: async (image) => {
    const { article, saveArticle } = get();
    if (article?.id) {
      set({
        article: {
          ...article,
          coverImage: image,
        },
      });
      await saveArticle();
    }
  },
  saveArticle: async () => {
    const { article, setSaving } = get();
    if (article?.id) {
      setSaving(true);
      const res = await axios.put(`/api/articles/${article?.id}`, article);
      setSaving(false);
      return res;
    }
  },
  syncArticle: async () => {
    const { article, setArticle } = get();
    if (article?.id) {
      const res = await axios.get(`/api/articles/${article?.id}`);
      if (res.data) {
        setArticle(res.data);
      }
    }
  },
}));
