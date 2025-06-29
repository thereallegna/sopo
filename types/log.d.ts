type TimelineItem = {
    log: string;
    date: string;
};

type TimelineProps = {
    data: TimelineItem[];
};

type TimelineQuery = {
    code: string;
    category: string;
};
