import React from 'react';

type TimelineItem = {
  log: string;
  date: string;
};

type TimelineProps = {
  data: TimelineItem[];
};
const Timeline: React.FC<TimelineProps> = ({ data }) => (
  <div className="flex flex-col gap-[10px]">
    {data.map((item) => (
      <div
        key={`${item.date}-${item.log}`}
        className="flex justify-between items-start gap-3"
      >
        <div className="flex-col h-full justify-center items-center mx-auto gap-3">
          <div className="mb-[1px] bg-Neutral-300 rounded-full w-[7px] h-[7px] mt-3" />

          {data.indexOf(item) < data.length - 1 && (
            <div className="w-[1px] h-full bg-Neutral-300 mx-auto flex-grow" />
          )}
        </div>
        <div className="flex-1 flex-col">
          <p className="text-Neutral-400 leading-4 mb-[4px]">{item.date}</p>
          <p className="text-Neutral-600 leading-4 font-semibold">{item.log}</p>
        </div>
      </div>
    ))}
  </div>
);

export default Timeline;
