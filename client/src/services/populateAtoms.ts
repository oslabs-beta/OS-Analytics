import {
  userDataAtom,
  userReferralDataAtom,
  websitesAtom,
  backendUrl,
} from "../state/Atoms";
import { useAtom } from "jotai";
import axios from "axios";
import { useEffect } from "react";

function populateAtoms() {
  const [, setUserData] = useAtom(userDataAtom);
  const [, setUserReferralData] = useAtom(userReferralDataAtom);
  const [, setWebsites] = useAtom(websitesAtom);

  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get(`${backendUrl}/api/data`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUserData(res.data);
        const websiteList: Set<string> = new Set(
          res.data.map((el: { website_name: string }) => el.website_name)
        );
        setWebsites(Array.from(websiteList));
      });
    axios
      .get(`${backendUrl}/api/data/referral`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUserReferralData(res.data);
      })
  }, []);
}

export default populateAtoms;
