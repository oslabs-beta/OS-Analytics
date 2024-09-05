import {
  userDataAtom,
  websitesAtom,
  backendUrl
} from '../state/Atoms';
import { useAtom } from 'jotai';
import axios from 'axios';
import { useEffect } from 'react';

function populateAtoms() {
  const token = localStorage.getItem('token');
  useEffect(() => {
    axios.get(`${backendUrl}/api/data`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      setUserData(res.data); 
      const websiteList: Set<string> = new Set(
        res.data.map((el: { website_name: string }) => el.website_name)
      );
      setWebsites(Array.from(websiteList));
    });
  }, []);

  const [, setUserData] = useAtom(userDataAtom);
  const [, setWebsites] = useAtom(websitesAtom);

 
}

export default populateAtoms;