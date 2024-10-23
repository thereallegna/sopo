import React from 'react';

const SidebarContent: React.FC = () => (
  <div className="overflow-y-scroll custom-scrollbar ">
    {Array.from({ length: 50 }, (_, i) => (
      <p key={i}>SidebarContent {i + 1}</p>
    ))}{' '}
  </div>
);

export default SidebarContent;
