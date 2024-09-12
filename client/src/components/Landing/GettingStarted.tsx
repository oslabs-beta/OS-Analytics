import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { Mouse, BarChart, Lock, Code } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const theme = createTheme({
  palette: {
    primary: {
      main: "#424242",
    },
    secondary: {
      main: "#757575",
    },
    background: {
      default: "#f5f5f5",
    },
  },
});

export default function ReadyToGetStarted() {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const features = [
    {
      icon: <Mouse />,
      title: "Click Tracking",
      description:
        "Monitor user clicks and interactions with our clickTracker hook.",
    },
    {
      icon: <BarChart />,
      title: "Real-time Analytics",
      description: "Visualize data in real-time on the OS Analytics dashboard.",
    },
    {
      icon: <Lock />,
      title: "Secure Tracking",
      description: "Ensure data security with JWT authentication.",
    },
    {
      icon: <Code />,
      title: "Developer API",
      description: "Fully documented API for easy integration and management.",
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box
        ref={sectionRef} 
        sx={{
          color: theme.palette.text.primary,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
         
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
              >
                <Typography variant="h2" component="h2" gutterBottom>
                  Ready to Get Started?
                </Typography>
                <Typography variant="h5" paragraph>
                  Join developers in leveraging powerful, open-source analytics
                  for your projects.
                </Typography>
                <Box sx={{ mt: 4 }}>
                  <Link to="/signup">
                    <Button
                      variant="contained"
                      size="large"
                      sx={{
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        "&:hover": {
                          backgroundColor: theme.palette.primary.dark,
                        },
                        mr: 2,
                        mb: isMobile ? 2 : 0,
                      }}
                    >
                      Get Started
                    </Button>
                  </Link>
                  <a
                    href="https://github.com/oslabs-beta/ActivityTracker.io"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outlined"
                      size="large"
                      sx={{
                        borderColor: theme.palette.primary.main,
                        color: theme.palette.primary.main,
                        "&:hover": {
                          borderColor: theme.palette.primary.dark,
                          backgroundColor: "rgba(66, 66, 66, 0.08)",
                        },
                      }}
                    >
                      View on GitHub
                    </Button>
                  </a>
                </Box>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                {features.map((feature, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={isVisible ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.8 + index * 0.2, duration: 0.6 }}
                    >
                      <Card
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          transition:
                            "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                          "&:hover": {
                            transform: "translateY(-5px)",
                            boxShadow: theme.shadows[4],
                          },
                        }}
                      >
                        <CardContent>
                          <Box display="flex" alignItems="center" mb={2}>
                            {React.cloneElement(feature.icon, {
                              fontSize: "large",
                              color: "primary",
                              sx: { mr: 2 },
                            })}
                            <Typography variant="h6" component="h3">
                              {feature.title}
                            </Typography>
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            {feature.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
