import { useEffect, useRef, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Link,
} from "@mui/material";
import { GitHub, LinkedIn, Article } from "@mui/icons-material";
import { motion } from "framer-motion";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef(null);

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

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      ref={footerRef}
      initial={{ opacity: 0, x: 50 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 2 }}
    >
      <Box
        component="footer"
        sx={{
          backgroundColor: "grey.100",
          py: 4,
          mt: "auto",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} justifyContent="space-between">
            <Grid item xs={12} sm={6} md={4} textAlign="center">
              <Typography variant="h6" color="text.primary" gutterBottom>
                OS Analytics
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Open-source web analytics
                <br />
                Simple and powerful
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={4} textAlign="center">
              <Typography variant="h6" color="text.primary" gutterBottom>
                Links
              </Typography>
              <a href="/" style={{ textDecoration: "none" }}>
                <Link sx={{ color: "text.secondary", display: "block", my: 1 }}>
                  Home
                </Link>
              </a>
              <a href="/docs" style={{ textDecoration: "none" }}>
                <Link sx={{ color: "text.secondary", display: "block", my: 1 }}>
                  Documentation
                </Link>
              </a>
              <a href="/signup" style={{ textDecoration: "none" }}>
                <Link sx={{ color: "text.secondary", display: "block", my: 1 }}>
                  Sign Up
                </Link>
              </a>
              <a href="/login" style={{ textDecoration: "none" }}>
                <Link sx={{ color: "text.secondary", display: "block", my: 1 }}>
                  Sign In
                </Link>
              </a>
            </Grid>

            <Grid item xs={12} sm={6} md={4} textAlign="center">
              <Typography variant="h6" color="text.primary" gutterBottom>
                Connect
              </Typography>
              <a
                href="https://github.com/oslabs-beta/ActivityTracker.io"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <IconButton aria-label="GitHub" sx={{ color: "#333", mx: 1 }}>
                  <GitHub />
                </IconButton>
              </a>

              <a
                href="https://www.linkedin.com/company/104969092/admin/dashboard/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <IconButton
                  aria-label="LinkedIn"
                  sx={{ color: "#0077b5", mx: 1 }}
                >
                  <LinkedIn />
                </IconButton>
              </a>

              <a
                href="https://medium.com/@dimarzio.eric/introducing-os-analytics-an-open-source-website-analytics-toolkit-for-developers-68c0906f8669"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <IconButton aria-label="Medium" sx={{ color: "#333", mx: 1 }}>
                  <Article />
                </IconButton>
              </a>
            </Grid>
          </Grid>

          <Box mt={3}>
            <Typography variant="body2" color="text.secondary" align="center">
              © {new Date().getFullYear()} OS Analytics
            </Typography>
          </Box>
        </Container>
      </Box>
    </motion.div>
  );
}
