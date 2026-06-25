'use client';

import React, { useMemo, useState } from 'react';
import styles from './GithubActivity.module.css';

interface ActivityCell {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export default function GithubActivity() {
  const [hoveredCell, setHoveredCell] = useState<ActivityCell | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // Generate synthetic contribution grid (18 weeks x 7 days = 126 days)
  const activityData = useMemo(() => {
    const data: ActivityCell[] = [];
    const now = new Date();
    // Start 18 weeks ago, aligning with a Sunday
    const startDate = new Date();
    startDate.setDate(now.getDate() - 126);
    
    // Make sure we start on a Sunday for consistency
    const dayOfWeek = startDate.getDay();
    startDate.setDate(startDate.getDate() - dayOfWeek);

    for (let i = 0; i < 126; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);

      // Generate a realistic commit count
      // Weekends have fewer commits, weekdays have more
      const day = currentDate.getDay();
      const isWeekend = day === 0 || day === 6;
      let count = 0;
      
      // Introduce periodic coding cycles
      const cycleIndex = Math.sin(i / 10);
      if (cycleIndex > -0.2) {
        count = Math.floor(Math.random() * (isWeekend ? 3 : 8));
      }
      
      // Occasionally generate a high commit day
      if (Math.random() > 0.95) {
        count = Math.floor(Math.random() * 5) + 8;
      }

      let level: 0 | 1 | 2 | 3 | 4 = 0;
      if (count > 0 && count <= 2) level = 1;
      else if (count > 2 && count <= 4) level = 2;
      else if (count > 4 && count <= 7) level = 3;
      else if (count > 7) level = 4;

      const dateString = currentDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });

      data.push({ date: dateString, count, level });
    }
    return data;
  }, []);

  // Split into 18 weeks
  const weeks = useMemo(() => {
    const chunked = [];
    for (let i = 0; i < activityData.length; i += 7) {
      chunked.push(activityData.slice(i, i + 7));
    }
    return chunked;
  }, [activityData]);

  const handleMouseMove = (e: React.MouseEvent, cell: ActivityCell) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const parentRect = e.currentTarget.parentElement?.parentElement?.getBoundingClientRect();
    if (parentRect) {
      setTooltipPos({
        x: rect.left - parentRect.left + rect.width / 2,
        y: rect.top - parentRect.top - 35,
      });
    }
    setHoveredCell(cell);
  };

  const handleMouseLeave = () => {
    setHoveredCell(null);
  };

  const totalContributions = useMemo(() => {
    return activityData.reduce((acc, cell) => acc + cell.count, 0);
  }, [activityData]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleWrap}>
          <span className={styles.title}>GitHub Activity</span>
          <span className={styles.username}>@EbrahimAmer207</span>
        </div>
        <div className={styles.stats}>
          <span className={styles.number}>{totalContributions}</span>
          <span className={styles.statsLabel}>commits in past 4 months</span>
        </div>
      </div>

      <div className={styles.graphWrapper}>
        {hoveredCell && (
          <div
            className={styles.tooltip}
            style={{
              left: `${tooltipPos.x}px`,
              top: `${tooltipPos.y}px`,
            }}
          >
            <strong>{hoveredCell.count === 0 ? 'No' : hoveredCell.count} commits</strong> on {hoveredCell.date}
          </div>
        )}

        <div className={styles.days}>
          <span>Mon</span>
          <span>Wed</span>
          <span>Fri</span>
        </div>

        <div className={styles.grid}>
          {weeks.map((week, wIndex) => (
            <div key={wIndex} className={styles.column}>
              {week.map((cell, dIndex) => (
                <div
                  key={dIndex}
                  className={`${styles.cell} ${styles[`level-${cell.level}`]}`}
                  onMouseMove={(e) => handleMouseMove(e, cell)}
                  onMouseLeave={handleMouseLeave}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.footer}>
        <span>Less</span>
        <div className={styles.legend}>
          <div className={`${styles.cell} ${styles['level-0']}`} />
          <div className={`${styles.cell} ${styles['level-1']}`} />
          <div className={`${styles.cell} ${styles['level-2']}`} />
          <div className={`${styles.cell} ${styles['level-3']}`} />
          <div className={`${styles.cell} ${styles['level-4']}`} />
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
