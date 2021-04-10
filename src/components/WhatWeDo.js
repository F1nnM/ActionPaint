import SectionFrame from "./SectionFrame";
import styles from './WhatWeDo.module.css';
import whatwedo from "../data/whatwedo";
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

function WhatWeDo() {
  return(
    <SectionFrame title="What We Do">
      <Timeline align="alternate">
        {whatwedo.map((description, idx)=>(
          <TimelineItem>
          <TimelineSeparator>
            <TimelineDot className={idx % 2 === 0 ? styles.primarytimelineicon : styles.secondarytimelineicon}>
              <FastfoodIcon/>
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={idx % 2 === 0 ? styles.primarytimeline : styles.secondarytimeline}>
              <Typography variant="h6" component="h1">
                {description.Title}
              </Typography>
              <Typography>{description.Description}</Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
        ))}
    </Timeline>
    </SectionFrame>
  );
}

export default WhatWeDo;
