import {
  userDataAtom,
  userReferralDataAtom,
  websitesAtom,
  backendUrl,
} from "../state/Atoms";
import { useAtom } from "jotai";
import axios from "axios";
import { useEffect } from "react";

async function populateAtoms() {
  const [, setUserData] = useAtom(userDataAtom);
  const [, setUserReferralData] = useAtom(userReferralDataAtom);
  const [, setWebsites] = useAtom(websitesAtom);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataResponse = await axios.get(`${backendUrl}/api/data`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(userDataResponse.data);

        const websiteList: Set<string> = new Set(
          userDataResponse.data.map((el: { website_name: string }) => el.website_name)
        );
        setWebsites(Array.from(websiteList));

        const userReferralDataResponse = await axios.get(`${backendUrl}/api/data/referral`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserReferralData(userReferralDataResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [setUserData, setUserReferralData, setWebsites, token]);

}

export default populateAtoms;
