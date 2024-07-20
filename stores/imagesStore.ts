import { create } from "zustand";

interface ImagesStore {
  images: File[];
  addImage: (images: File[]) => void;
}

const useImagesStore = create<ImagesStore>((set) => ({
  images: [],
  addImage: (images: File[]) => set({ images }),
}));

export default useImagesStore;
