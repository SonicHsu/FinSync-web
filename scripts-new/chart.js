import { getMonthCategoryTotals } from "./calculator.js";

 let selectedDate = today();



 

document.addEventListener("view-stats-entries", (event) => {
const date = event.detail.date;

})


const expenseTotals = {
    salary: 3000,
    bonus: 500,
    investment: 200,
    incomeOther: 100
};
// 收入資料
const incomeTotals = {
    salary: 3000,
    bonus: 500,
    investment: 200,
    incomeOther: 100
};

// 提取分類與數值
const expenseCategories = Object.keys(expenseTotals);
const expenseValues = Object.values(expenseTotals);

const incomeCategories = Object.keys(incomeTotals);
const incomeValues = Object.values(incomeTotals);

// 設定圖表資料
const data = {
    labels: expenseCategories, // 以支出類別為主
    datasets: [
        {
            label: 'Expense',
            data: expenseValues,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        },
        {
            label: 'Income',
            data: incomeValues,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            hidden: true // 預設隱藏收入
        }
    ]
};

// 設定圖表配置
const config = {
    type: 'bar',
    data: data,
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                position: 'top'
            },
            tooltip: {
                enabled: true
            }
        }
    }
};
