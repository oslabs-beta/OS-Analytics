import { useEffect, useState, useRef } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  ThemeProvider,
  createTheme,
} from "@mui/material";
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

export default function DashboardPreview() {
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

  return (
    <ThemeProvider theme={theme}>
      <Box
        ref={sectionRef}
        sx={{
          backgroundColor: "#f4f4f4",
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
                  Explore the Analytics Dashboard
                </Typography>
                <Typography variant="h5" paragraph>
                  Get real-time insights and track user activities on the fly.
                  Dive into powerful analytics and optimize your application’s
                  performance effortlessly.
                </Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8 }}
              >
                <img
                  src="https://github.com/user-attachments/assets/369f8d06-1ad9-4008-9d0f-2b7f730ef8e8"
                  alt="Dashboard Preview"
                  style={{
                    width: "100%",
                    borderRadius: "10px",
                    boxShadow: theme.shadows[4],
                  }}
                />
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
