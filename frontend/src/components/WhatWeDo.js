import styles from "./WhatWeDo.module.scss";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import CheckIcon from "@material-ui/icons/Check";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { useState, useEffect } from "react";
import { debounce } from "@material-ui/core";

function WhatWeDo({ data }) {
  const [ width, setWidth ] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      debounce(setWidth(window.innerWidth));
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setWidth]);

  const whatwedo = data["whatwedo"];

  return (
    // Create a Timeline which alternates in Position (only if width > 800 for Spacing Reasons on Mobile) and Color

    <Timeline key="Timeline" align={width > 800 ? "alternate" : "left"}>
      {whatwedo.map((description, idx) => (

        // Iterate over whatwedo.json and create a Timeline Item based on the content 
        <TimelineItem key={"TimelineItem" + idx}>
          <TimelineOppositeContent className={styles.oppositecontent} />
          <TimelineSeparator>
            <TimelineDot
              className={
                idx % 2 === 0
                  ? styles.bgAccent + " text-primary"
                  : styles.textAccent + " bg-primary"
              }
            >
              <CheckIcon />
            </TimelineDot>
            {whatwedo.length===(idx+1) || <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent>
            <Paper
              elevation={2}
              className={
                idx % 2 === 0
                  ? styles.primarytimeline
                  : styles.secondarytimeline
              }
            >
              <Typography variant="h6" component="h1">{description.Title}</Typography>
              <Typography>{description.Description}</Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}

export default WhatWeDo;
