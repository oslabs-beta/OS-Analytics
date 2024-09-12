import { Grid, Paper, Box } from "@mui/material";
import ClickGraph from "./Charts/LineGraph-clicks";
import DuelPieGraphs from "./Charts/DuelPieChart-clicks";
import BarGraph from "./Charts/BarGraph-clicks";
import BarGraph_referrer from "./Charts/BarGraph-referrer";
import AiResponseComponent from "./Charts/aiResponse";
import { websiteDataAtom, websiteReferralDataAtom } from "../../state/Atoms";
import ScatterChart from "./Charts/ScatterChart-clicks";
import { useAtom } from "jotai";
import { mapUserData } from "../../services/extractData";
import RadarChart from "./Charts/RadarGraph-clicks";
import StackedBarChart from "./Charts/StackedBarGraph-clicks";
import Heatmap from "./Charts/Heatmap";

const WebsiteData = () => {
  const [websiteData] = useAtom(websiteDataAtom);
  const allDataResponse = mapUserData(websiteData);
  const [websiteReferralData] = useAtom(websiteReferralDataAtom);

  return (
    <Box sx={{ padding: 6 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <BarGraph data={allDataResponse} keyword={"page_url"} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <ScatterChart data={allDataResponse} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <ClickGraph data={allDataResponse} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              height: "100%",
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <DuelPieGraphs
              data={allDataResponse}
              keyword={"user_browser"}
              keywordTwo={"user_os"}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <StackedBarChart
              data={allDataResponse}
              keyword={"user_browser"}
              keywordTwo={"page_url"}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <BarGraph_referrer data={websiteReferralData} />
          </Paper>
        </Grid>


        <Grid item xs={12} md={3.3}>
          <Paper
            elevation={3}
            sx={{
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <RadarChart
              data={allDataResponse}
              keyword={"page_url"}
              keywordTwo={"user_browser"}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8.7}>
          <Paper
            elevation={3}
            sx={{
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <AiResponseComponent />
          </Paper>
        </Grid>
        <Grid container justifyContent="right">
          <Grid item xs={12} md={8.6} sx={{ mt: -18,  }}>
            <Paper
              elevation={3}
              sx={{
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <Heatmap data={allDataResponse} />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WebsiteData;
