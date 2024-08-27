import { atom } from 'jotai';

// const userStore = createStore();

export const activeUserAtom = atom<string>('');
export const activeNavAtom = atom<boolean>(false);

export const loadingAtom = atom<boolean>(false);
// export const authAtom = atom<boolean>(true);

// User's Click Data
export const userDataAtom = atom<[]>([]);
export const websitesAtom = atom<[]>([])
//manipulated by the dropdown choice in Dashboard.tsx
export const activeWebsiteAtom = atom<string>('');
export const websiteDataAtom = atom((get) => {
  //references the active website atom
  const activeWebsite = get(activeWebsiteAtom);
  //references the complete data set and filters according to the active website atom
  return get(userDataAtom).filter((el:any) => el.website_name === activeWebsite);
});
export const timeFrameAtom = atom<string>('24hours');
