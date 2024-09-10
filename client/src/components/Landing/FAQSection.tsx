import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqs = [
  {
    question: "What is OS Analytics?",
    answer:
      "OS Analytics is a tool that allows developers to track and visualize user interactions on their websites in real-time using a custom click tracker.",
  },
  {
    question: "How do I install OS Analytics?",
    answer:
      "You can install OS Analytics by running `npm install os-analytics` and integrating the `clickTracker` hook into your React app.",
  },
  {
    question: "What kind of metrics can I track with OS Analytics?",
    answer:
      "You can track metrics like click events, page views, referrer events, heatmaps, and other activity such as OS and browser data.",
  },
  {
    question: "Is OS Analytics free to use?",
    answer:
      "Yes, OS Analytics is an open-source tool, and you can freely use it for tracking and visualizing website interactions.",
  },
  {
    question: "How can I configure multiple websites for tracking?",
    answer:
      "You can configure multiple websites in the OS Analytics dashboard, and you can monitor them all from one account with detailed metrics for each site.",
  },
];

export default function FAQSection() {
  return (
    <section style={{ padding: '40px 0', backgroundColor: '#f4f4f4' }}>

    <Container
      sx={{
        width: '100%',
        maxWidth: '100%',       
        padding: '40px 0',
        backgroundColor: '#f4f4f4', 
        borderRadius: '8px',    
    
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Frequently Asked Questions
      </Typography>
      {faqs.map((faq, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            <Typography variant="h6">{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
     </section>
  );
}
