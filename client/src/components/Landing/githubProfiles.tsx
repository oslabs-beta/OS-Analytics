import { Grid, Card, CardContent, Typography, Avatar, Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ericImage from '../../assets/team/eric.png';
import peterImage from '../../assets/team/peter.png';
import davidImage from '../../assets/team/david.png';
import sawImage from '../../assets/team/saw.png';

const teamMembers = [
  {
    name: 'Eric DiMarzio',
    github: 'https://github.com/EricDiMarzio',
    linkedin: 'https://www.linkedin.com/in/ericdimarzio/',
    image: ericImage,
  },
  {
    name: 'Peter Larcheveque',
    github: 'https://github.com/plarchev',
    linkedin: 'https://linkedin.com/in/peter-larcheveque/',
    image: peterImage,
  },
  {
    name: 'David Naymon',
    github: 'https://github.com/DavidN22',
    linkedin: 'https://www.linkedin.com/in/david-naymon-76520018a/',
    image: davidImage,
  },
  {
    name: 'Saw Yan Naing',
    github: 'https://github.com/willsyn7',
    linkedin: 'https://www.linkedin.com/in/saw-naing/',
    image: sawImage,
  },
];

export default function TeamSection() {
  const [isVisible, setIsVisible] = useState(false);

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

    const section = document.getElementById('team-section');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section id="team-section" style={{ padding: '40px 0', backgroundColor: '#ffffff' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Meet the Team
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {teamMembers.map((member, index) => (
          <Grid item md={2} key={member.name}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <Card
                sx={{
                  textAlign: 'center',
                  padding: '20px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e0e0e0',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                  },
                }}
              >
                <Avatar
                  src={member.image}
                  alt={member.name}
                  sx={{ width: 160, height: 160, margin: '0 auto', marginBottom: '16px' }}
                />
                <CardContent>
                  <Typography variant="h6">{member.name}</Typography>
                  <a href={member.github} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    <Button
                      variant="outlined"
                      startIcon={<GitHubIcon />}
                      sx={{ margin: '8px 0', color: '#fff', backgroundColor: '#333', minWidth: '150px' }}
                    >
                      GitHub
                    </Button>
                  </a>
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    <Button
                      variant="outlined"
                      startIcon={<LinkedInIcon />}
                      sx={{ margin: '8px 0', color: '#fff', backgroundColor: '#0077b5', minWidth: '150px' }}
                    >
                      LinkedIn
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </section>
  );
}