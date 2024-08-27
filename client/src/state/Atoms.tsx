import {atom} from 'jotai';

// const userStore = createStore();

export const activeUserAtom = atom<string>('');
export const activeNavAtom = atom<boolean>(false);

export const loadingAtom = atom<boolean>(false);
// export const authAtom = atom<boolean>(true);

// User's Click Data
export const userDataAtom = atom<[]>([])
export const timeFrameAtom = atom<string>('24hours');