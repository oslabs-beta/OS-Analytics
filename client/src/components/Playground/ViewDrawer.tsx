import React, { useState } from "react";
import {
  Box,
  Drawer,
  Toolbar,
  List,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import {
  Inbox as InboxIcon,
  ExpandLess,
  ExpandMore,
  AccountTree as TreeIcon,
  DeviceHub as DiagramIcon,
} from "@mui/icons-material";
import { useAtom } from "jotai";
import { userDataAtom, websitesAtom } from "../../state/Atoms";
import { DrawerFrequencyProps } from "../../../types";

const drawerWidth = 240;

export default function PermanentDrawerLeft({
  onSelectView,
  onSelectWebsite,
  onSelectPage,
}: DrawerFrequencyProps) {
  const [userData] = useAtom(userDataAtom);
  const [openMainItem, setOpenMainItem] = useState<string | null>(null);
  const [openWebsite, setOpenWebsite] = useState<string | null>(null);
  const [websitesList] = useAtom(websitesAtom);

  const handleMainItemClick = (item: string) => {
    setOpenMainItem(openMainItem === item ? null : item);
  };

  const handleWebsiteToggle = (website: string) => {
    setOpenWebsite(openWebsite === website ? null : website);
  };

  const handlePageClick = (website: string, page: string) => {
    onSelectWebsite(website);
    onSelectPage(page);
    onSelectView("frequency");
  };

  const handleViewChange = (view: string) => {
    onSelectView(view);
  };

  const pagesByWebsite: { [key: string]: string[] } = {};

  websitesList.forEach((website) => {
    const filteredUserData = userData.filter((item) => item.website_name === website);
    const pageUrls = filteredUserData.map((item) => item.page_url);
    const uniquePageUrlsSet = new Set(pageUrls);
    const uniquePageUrls = Array.from(uniquePageUrlsSet);
  
    pagesByWebsite[website] = uniquePageUrls;
  });

  return (
    <Box>
      <Drawer
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            marginTop: "65px",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Divider />
        <List>
          <ListItemButton onClick={() => handleMainItemClick("frequency")}>
            <ListItemIcon>
              <DiagramIcon />
            </ListItemIcon>
            <ListItemText primary="Frequency Nodes" />
            {openMainItem === "frequency" ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse
            in={openMainItem === "frequency"}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              {websitesList.map((website) => (
                <React.Fragment key={website}>
                  <ListItemButton
                    onClick={() => handleWebsiteToggle(website)}
                    sx={{ pl: 4, mb: 2 }}
                  >
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary={website} />
                    {openWebsite === website ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse
                    in={openWebsite === website}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {pagesByWebsite[website].map((page_url) => (
                        <ListItemButton
                          key={page_url}
                          sx={{ pl: 8 }}
                          onClick={() => handlePageClick(website, page_url)}
                        >
                          <ListItemText primary={page_url} />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                </React.Fragment>
              ))}
            </List>
          </Collapse>
          <ListItemButton onClick={() => handleViewChange("tree")}>
            <ListItemIcon>
              <TreeIcon />
            </ListItemIcon>
            <ListItemText primary="Tree Graph" />
          </ListItemButton>
        </List>
        <Divider />
        <List>
        </List>
      </Drawer>
      <Box>
        <Toolbar />
      </Box>
    </Box>
  );
}
