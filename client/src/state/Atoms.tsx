import {atom} from 'jotai';

// const userStore = createStore();

export const activeUserAtom = atom<string>('Eric');
export const authAtom = atom<boolean>(true);