import { atom } from 'jotai';
import { QueryData } from '../../types';
// const userStore = createStore();

// dev backend URI
// http://ec2-13-52-215-70.us-west-1.compute.amazonaws.com:8080
export const backendUrl:string = '';
export const activeUserAtom = atom<string>('');
export const activeNavAtom = atom<boolean>(false);

export const loadingAtom = atom<boolean>(true);
// export const authAtom = atom<boolean>(true);

// User's Click Data
export const userDataAtom = atom<QueryData[]>([]);
export const websitesAtom = atom<string[]>([])
export const activeWebsiteAtom = atom<string>('All Websites');

export const websiteDataAtom = atom((get) => {
  //references the active website atom
  const activeWebsite = get(activeWebsiteAtom);
  //references the complete data set and filters according to the active website atom
  return get(userDataAtom).filter((el) => el.website_name === activeWebsite);
});
export const timeFrameAtom = atom<string>('1 day');
