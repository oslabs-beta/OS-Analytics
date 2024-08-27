import { atom } from 'jotai';

// const userStore = createStore();

export const activeUserAtom = atom<string>('');
export const activeNavAtom = atom<boolean>(false);

export const loadingAtom = atom<boolean>(false);
// export const authAtom = atom<boolean>(true);

// User's Click Data
export const userDataAtom = atom<[]>([]);
export const websitesAtom = atom<[]>([])
export const activeWebsiteAtom = atom<string>('');
export const websiteDataAtom = atom((get) => {
  const activeWebsite = get(activeWebsiteAtom);
  return get(userDataAtom).filter((el:any) => el.website_name === activeWebsite);
});
export const timeFrameAtom = atom<string>('24hours');
