// chart.js
// import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "https://cdn.cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.js";

// // 註冊必要的元件
// Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

import { getMonthCategoryTotals } from "./calculator.js";

// 模擬數據
const expenseTotals = {
    "food": 130,
    "transport": 50,
    "housing": 0,
    "entertainment": 20,
    "life": 80,
    "other": 40,
};

const incomeTotals = {
    "salary": 500,
    "bonus": 200,
    "investment": 0,
    "incomeOther": 100,
};

// 將資料轉換為 Chart.js 格式
const expenseLabels = Object.keys(expenseTotals);
const expenseData = Object.values(expenseTotals);

const incomeLabels = Object.keys(incomeTotals);
const incomeData = Object.values(incomeTotals);

// 初始化支出圖表
export function initCharts() {
    const expenseCtx = document.getElementById("expenseChart").getContext("2d");
    const incomeCtx = document.getElementById("incomeChart").getContext("2d");

    const expenseChart = new Chart(expenseCtx, {
        type: "bar",
        data: {
            labels: expenseLabels,
            datasets: [
                {
                    label: "支出",
                    data: expenseData,
                    backgroundColor: "rgba(255, 99, 132, 0.6)",
                    borderColor: "rgba(255, 99, 132, 1)",
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true },
            },
        },
    });

    // 初始化收入圖表
    const incomeChart = new Chart(incomeCtx, {
        type: "bar",
        data: {
            labels: incomeLabels,
            datasets: [
                {
                    label: "收入",
                    data: incomeData,
                    backgroundColor: "rgba(75, 192, 192, 0.6)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true },
            },
        },
    });
}
