import styles from './WhatWeDo.module.css';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useState, useEffect } from 'react';

function getWindowDimensions() {
  const { innerWidth: width } = window;
  return {
    width
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

function WhatWeDo({ data }) {
  const { width } = useWindowDimensions();

  const whatwedo = data.whatwedo;

  return(
      <Timeline key="Timeline" align={width > 800 ? "alternate" : "left"}>
        {whatwedo.map((description, idx)=>(
          <TimelineItem key={"TimelineItem"+idx}>
            <TimelineOppositeContent className={styles.oppositecontent} style={{flex:0}}> 
            </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot className={idx % 2 === 0 ? styles.primarytimelineicon : styles.secondarytimelineicon}>
              <FastfoodIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={2} className={idx % 2 === 0 ? styles.primarytimeline : styles.secondarytimeline}>
              <Typography variant="h6" component="h1">
                {description.Title}
              </Typography>
              <Typography>{description.Description}</Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
        ))}
    </Timeline>
  );
}

export default WhatWeDo;
