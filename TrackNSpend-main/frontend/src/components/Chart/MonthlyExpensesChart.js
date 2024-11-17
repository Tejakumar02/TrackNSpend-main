import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { aggregateExpensesByMonth } from '../../helpers/common';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MonthlySpendingChart = ({ expenses }) => {
    const { months, amounts } = aggregateExpensesByMonth(expenses);

    const data = {
        labels: months,
        datasets: [
            {
                label: 'Monthly Spending',
                data: amounts,
                backgroundColor: '#E64E03',
                borderColor: '#3C3D37',
                borderWidth: 1,
            }
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            tooltip: {
                callbacks: {
                    label: (context) => `₹${context.raw}`,
                },
            },
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Amount (₹)',
                },
                beginAtZero: true,
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default MonthlySpendingChart;
