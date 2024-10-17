import React from 'react';

const Card = ({ width = 'w-[400px]', height = 'h-[500px]'}) => {
    return (
        <div className={`rounded-xl bg-white p-8 flex flex-col justify-start items-center gap-8 shadow-lg ${width} ${height} max-w-[600px]`}>
            {/* Card Content Here */}
        </div>
    )
}

export default Card