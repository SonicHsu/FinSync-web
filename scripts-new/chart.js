import { getMonthCategoryTotals } from "./calculator.js";

let selectedDate = today();





document.addEventListener("view-stats-entries", (event) => {
    const date = event.detail.date;

})

let myDialogChartInstance = null; // 用于存储图表实例，方便后续销毁

export function createOrUpdateDialogChart() {
    // 如果已存在图表实例，先销毁它
    if (myDialogChartInstance) {
        myDialogChartInstance.destroy();
        myDialogChartInstance = null;
    }

    const expenseTotals = {
        salary: 3000,
        bonus: 500,
        investment: 200,
        incomeOther: 100
    };
    const incomeTotals = {
        salary: 3000,
        bonus: 500,
        investment: 200,
        incomeOther: 100
    };

    const expenseCategories = Object.keys(expenseTotals);
    const expenseValues = Object.values(expenseTotals);
    const incomeCategories = Object.keys(incomeTotals);
    const incomeValues = Object.values(incomeTotals);

    const data = {
        labels: expenseCategories,
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
                hidden: true
            }
        ]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false, //  在 dialog 中，通常设置为 false 更好控制
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { color: 'rgba(200, 200, 200, 0.8)' }, // 示例：调整刻度颜色
                    grid: { color: 'rgba(200, 200, 200, 0.2)' }   // 示例：调整网格线颜色
                },
                x: {
                    ticks: { color: 'rgba(200, 200, 200, 0.8)' },
                    grid: { color: 'rgba(200, 200, 200, 0.2)' }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: { color: 'rgba(220, 220, 220, 0.9)' } // 示例：调整图例文字颜色
                },
                tooltip: {
                    enabled: true
                }
            }
        }
    };

    const canvasElement = document.getElementById('myChart');
    // 确保 canvas 元素存在于 dialog 内部
    const dialog = document.querySelector('dialog[data-dialog="view-stats"]');
    if (!dialog || !dialog.contains(canvasElement)) {
        console.error("Canvas 'myChart' not found within the 'view-stats' dialog or dialog itself not found.");
        return;
    }

    const ctx = canvasElement?.getContext('2d');
    if (!ctx) {
        console.error("无法从 ID 为 'myChart' 的 canvas 获取 2D 上下文。");
        return;
    }

    myDialogChartInstance = new Chart(ctx, config);
    console.log("Dialog chart created/updated.");
}