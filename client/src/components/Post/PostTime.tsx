import React from 'react';
import styles from './Post.module.scss';
interface PostTimeProps {
 jsonCreatedAt: string;
}

const PostTime: React.FC<PostTimeProps> = ({ jsonCreatedAt }) => {
 const createdAt = new Date(jsonCreatedAt);
 const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

 // Get the current time in the user's timezone
 const currentTime = new Date();
 const currentTimeInUserTz = new Date(
  currentTime.toLocaleString('en-US', { timeZone: userTimezone })
 );

 // Calculate the time difference in milliseconds
 const timeDiffMs = currentTimeInUserTz.getTime() - createdAt.getTime();

 // Calculate the time difference in seconds, minutes, hours, and days
 const secondsElapsed = Math.floor(timeDiffMs / 1000);
 const minutesElapsed = Math.floor(timeDiffMs / (1000 * 60));
 const hoursElapsed = Math.floor(timeDiffMs / (1000 * 60 * 60));
 const daysElapsed = Math.floor(timeDiffMs / (1000 * 60 * 60 * 24));

 if (daysElapsed >= 2) {
  const formattedDate = createdAt.toLocaleDateString('en-US', {
   month: 'short',
   day: 'numeric',
   year: 'numeric',
  });
  return <p className={styles.formatTime}>{formattedDate}</p>;
 } else if (hoursElapsed >= 1) {
  return <p className={styles.formatTime}>{hoursElapsed}h ago</p>;
 } else if (minutesElapsed >= 1) {
  return <p className={styles.formatTime}>{minutesElapsed}m ago</p>;
 } else {
  return <p className={styles.formatTime}>{secondsElapsed}s ago</p>;
 }

};

export default PostTime;