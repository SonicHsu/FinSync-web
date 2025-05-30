import { formatDateForStats, formatMonthForStats } from "./date.js";

const TypeMap = {
    "expense": "totalExpense",
    "income": "totalIncome"
};

export const expenseCategoryMap = {
    "food": "totalFood",
    "transport": "totalTransport",
    "housing": "totalHousing",
    "entertainment": "totalEntertainment",
    "life": "totalLife",
    "expenseOther": "totalExpenseOther"
};

export const incomeCategoryMap = {
    "salary": "totalSalary",
    "bonus": "totalBonus",
    "investment": "totalInvestment",
    "incomeOther": "totalIncomeOther"
};

function calculateTotals(entries, dateKey, map) {
    const isTypeMap = "expense" in map || "income" in map;

    const totals = entries.reduce((acc, entry) => {
        if (!acc[dateKey]) {
            acc[dateKey] = {};
        }

        const mapKey = isTypeMap ? map[entry.type] : map[entry.category];

        if (!mapKey) return acc;

        if (!acc[dateKey][mapKey]) {
            acc[dateKey][mapKey] = 0;
        }

        acc[dateKey][mapKey] += entry.amount;

        return acc;
    }, {});

    return totals;
}
export function getDateTypeTotals(entries, date) {
    const dateKey = formatDateForStats(date);
    const entriesTotal = calculateTotals(entries, dateKey, TypeMap);

    const expense = entriesTotal[dateKey]?.totalExpense || 0;
    const income = entriesTotal[dateKey]?.totalIncome || 0;

    return { expense, income };
}

export function getMonthCategoryTotals(entries, date, map) {
    const dateKey = formatMonthForStats(date);
    const entriesTotal = calculateTotals(entries, dateKey, map);

    const categories = Object.keys(map);

    return categories.reduce((acc, key) => {
        const mapKey = map[key];
        acc[key] = entriesTotal[dateKey]?.[mapKey] || 0;
        return acc;
    }, {});
}
