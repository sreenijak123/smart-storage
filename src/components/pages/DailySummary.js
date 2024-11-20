import React from 'react';

const DailySummary = () => {
  const summaryData = [
    { id: 1, activity: 'Added 5 items to storage' },
    { id: 2, activity: 'Removed 2 items from storage' },
    { id: 3, activity: 'Checked inventory levels' },
  ];

  return (
    <div>
      <h2>Daily Summary</h2>
      <ul>
        {summaryData.map((entry) => (
          <li key={entry.id}>{entry.activity}</li>
        ))}
      </ul>
    </div>
  );
};

export default DailySummary;
