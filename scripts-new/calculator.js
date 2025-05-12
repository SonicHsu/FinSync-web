import { formatDateForStats, formatMonthForStats } from "./date.js";

const totalTypeMap = {
    "expense": "totalExpense",
    "income": "totalIncome"
};

const expenseCategoryMap = {
    "food": "totalFood",
    "transport": "totalTransport",
    "housing": "totalHousing",
    "entertainment": "totalEntertainment",
    "life": "totalLife",
    "expenseOther": "totalExpenseOther"
};

const incomeCategoryMap = {
    "salary": "totalSalary",
    "bonus": "totalBonus",
    "investment": "totalInvestment",
    "incomeOther": "totalIncomeOther"
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

export function getMonthCategoryTotals(entries, month, type) {
    const totals = calculateTotals(entries, formatMonthForStats, totalTypeMap, expenseCategoryMap, incomeCategoryMap);
    const monthData = totals[month]?.[type] || {};

    // 填充缺失的類別為 0
    const categoryMap = type === "totalExpense" ? expenseCategoryMap : incomeCategoryMap;
    const result = {};

    for (const [key, value] of Object.entries(categoryMap)) {
        const categoryKey = value;
        result[key] = monthData[categoryKey] || 0;
    }

    return result;
}