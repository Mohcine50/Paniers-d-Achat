

export const getDateRanges = (filter: "week"| "month" | "year" | null):Date => {
    const now = new Date();

    switch (filter) {
        case "week":
            const last7Days = new Date();
            last7Days.setDate(now.getDate() - 7);
            return last7Days;
            break;
        case "month":
            const last30Days = new Date();
            last30Days.setDate(now.getDate() - 30);
            return last30Days;
            break;
        case "year":
            const last12Months = new Date();
            last12Months.setFullYear(now.getFullYear() - 1);
            return last12Months;
            break;
        default:
            return new Date(0)
            break;

    }


};
