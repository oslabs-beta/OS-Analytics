import { referralData } from "../../types";
export const filterReferralDataByTimeFrame = (data: referralData[], timeFrame: string) => {
  const filteredData = [];
  const now = new Date();

  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const clickTime = new Date(item.created_at || 0);

    switch (timeFrame) {
      case "1 day":
        if (now.getTime() - clickTime.getTime() <= 24 * 60 * 60 * 1000) {
          filteredData.push(item);
        }
        break;
      case "1 month":
        if (now.getTime() - clickTime.getTime() <= 30 * 24 * 60 * 60 * 1000) {
          filteredData.push(item);
        }

        break;
      case "1 year":
        if (now.getFullYear() === clickTime.getFullYear()) {
          filteredData.push(item);
        }
        break;
      case "5 years":
        if (now.getFullYear() - clickTime.getFullYear() <= 5) {
          filteredData.push(item);
        }
        break;
      case "allTime":
      default:
        filteredData.push(item);
        break;
    }
  }

  return filteredData;
};
