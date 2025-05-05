import { formatDateForStats, formatMonthForStats } from "./date.js";

const totalTypeMap = {
    "expense": "totalExpense",
    "income": "totalIncome"
};

const totalCategoryMap = {
    "food": "totalFood",
    "transport": "totalTransport",
    "housing": "totalHousing",
    "entertainment": "totalEntertainment",
    "life": "totalLife",
    "other": "totalOther"
};

function calculateTotals(entries, formatFunction, typeMap, categoryMap = null) {
    const totals = entries.reduce((acc, entry) => {
        const dateKey = formatFunction(entry.date);
        if (!acc[dateKey]) {
            acc[dateKey] = {};
        }

        const typeKey = typeMap[entry.type];

        if (!typeKey) return acc;

        if (!acc[dateKey][typeKey]) {
            acc[dateKey][typeKey] = categoryMap ? {} : 0;
        }

        if (categoryMap) {
            const categoryKey = categoryMap[entry.category];
            if (categoryKey) {
                acc[dateKey][typeKey][categoryKey] =
                    (acc[dateKey][typeKey][categoryKey] || 0) + entry.amount;
            }
        } else {
            acc[dateKey][typeKey] += entry.amount;
        }

        return acc;
    }, {});

    return totals
}

export function getDateTypeTotals(entries) {
    return calculateTotals(entries, formatDateForStats, totalTypeMap);
}