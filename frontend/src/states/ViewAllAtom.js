import { atom, selector } from "recoil";
import { getFamousPosts } from "../actions/homeAction";

export const categoryAtom = atom({
  key: "categoryAtom",
  default: "",
});
export const materialAtom = atom({
  key: "materialAtom",
  default: "",
});
export const conditionAtom = atom({
  key: "conditionAtom",
  default: "",
});
export const cookAtom = atom({
  key: "cookAtom",
  default: "",
});
export const ViewAll = atom({
  key: "viewAll",
  default: [],
});

export const randomButtonState = atom({
  key: "randomButtonState",
  default: false,
});

export const randomPostState = atom({
  key: "randomPostState",
  default: {},
});

export const dropDownOptionsState = atom({
  key: "dropDownOptionsState",
  default: { category: "", material: "", condition: "", cook: "" },
});

export const count = atom({
  key: "count",
  default: 16,
});

export const famousPostsSelector2 = selector({
  key: "getFamousListSelector2",
  get: async ({ get }) => {
    const countIndex = get(count);
    try {
      const famousList = await getFamousPosts(1, countIndex);
      return famousList;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
});

export const sortState = atom({
  key: "sortState",
  default: "famous",
});
