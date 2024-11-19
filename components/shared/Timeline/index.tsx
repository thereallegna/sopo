'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDrawerStore } from '@stores/useDrawerStore';
import { GET_LOG_HISTORY } from '@constants/queryKey';
import { getLogHistory } from '@services/fetcher/log';

const Timeline: React.FC = () => {
  const { data_log_history_query } = useDrawerStore();

  const {
    data: data_log_history,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [GET_LOG_HISTORY],

    queryFn: () =>
      getLogHistory({
        code: data_log_history_query?.data?.code || '',
        category: data_log_history_query?.data?.category || '',
      }),
    enabled: !!data_log_history_query?.data,
  });

  if (isLoading) {
    // You can replace this with a loading spinner or any custom component
    return (
      <div className="flex justify-center items-center">
        <div className="loader">Loading...</div>{' '}
        {/* Add a spinner or custom loading UI here */}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500">
        Error loading log history. Please try again later.
      </div>
    );
  }

  if (!data_log_history?.data) return null;

  return (
    <div className="flex flex-col gap-[10px]">
      {data_log_history.data.map((item: TimelineItem) => (
        <div
          key={`${item.date}-${item.log}`}
          className="flex justify-between items-start gap-3"
        >
          <div className="flex-col h-full justify-center items-center mx-auto gap-3">
            <div className="mb-[1px] bg-Neutral-300 rounded-full w-[7px] h-[7px] mt-3" />
            {data_log_history.data.indexOf(item) <
              data_log_history.data.length - 1 && (
              <div className="w-[1px] h-full bg-Neutral-300 mx-auto flex-grow" />
            )}
          </div>
          <div className="flex-1 flex-col">
            <p className="text-Neutral-400 leading-4 mb-[4px]">{item.date}</p>
            <p className="text-Neutral-600 leading-4 font-semibold">
              {item.log}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
