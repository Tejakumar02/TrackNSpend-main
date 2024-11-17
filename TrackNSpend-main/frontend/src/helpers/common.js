function parseDate(dateStr) {
    return new Date(dateStr);
}

export function setTokenWithExpiry(key, token) {
    const now = new Date();
    const expiryTime = now.getTime() +  60 * 60 * 1000;

    const item = {
      token: token,
      expiry: expiryTime
    };

    sessionStorage.setItem(key, JSON.stringify(item));
};

export function removeToken() {
	sessionStorage.clear();
};

export function formatDate(value) {
	const date = parseDate(value);
	const ISODate = date.toISOString();

	const [year, month, day] = ISODate.split('T')[0].split('-');
	return `${day}/${month}/${year}`
}

export function checkTokenExpiry () {
    const token = sessionStorage.getItem('token');
    if (!token) {
        return false;
    }

    const tokenData = JSON.parse(token);
    const now = new Date().getTime();
    if (now > tokenData.expiry) {
        sessionStorage.clear();
        return true;
    }

    return false;
};

export function filterExpenses(expenses, condition) {
    const { fromDate, toDate } = condition

    return expenses.filter(expense => {
        const expenseDate = parseDate(expense.date);
        return expenseDate >= parseDate(fromDate) && expenseDate <= parseDate(toDate);;
    });
}

export function totalExpenses(expenses) {
    if (!Array.isArray(expenses) || expenses.length === 0) {
        return 0;
    }

    const total = expenses.reduce((accumulator, expense) => {
        return accumulator + (Number(expense.amount) || 0);
    }, 0);

    return total
}

export function validatePassword(password, confirmPassword) {
    if (password !== confirmPassword) {
        return true;
    }
    return false; 
}

export function isValidPassword(password) {
    if(password.length > 7) {
      return false
    }
    return true
}

export function isNotNull(value) {
    if(value === '' || value === undefined) {
        return true
    }
    return false
}

export function findCurrentMonth() {
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const date = new Date();
    const currentMonth = month[date.getMonth()];
    return currentMonth;
}

export function findCurrentYear() {
    const date = new Date();
    const currentYear =date.getFullYear();
    return currentYear;
}

export function findCurrentMonthExpenses(expenses) {
    const date = new Date();
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();

    const currentMonthExpenses = expenses.filter(expense => {
        const expenseDate = parseDate(expense.date);
        return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
    });

    const total = totalExpenses(currentMonthExpenses);
    return total;
}

export function getCurrentMonthBudget(budgets) {
    const date = new Date();
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();

    const currentMonthBudget = budgets.filter(budget => {
        const budgetMonth = budget.month
    })
}

export function sortExpenses(expenses) {
    const sortedExpenses = expenses
        .filter(expense => expense.date)
        .sort((a,b) => parseDate(b.date) - parseDate(a.date))
    return sortedExpenses;
}

export const aggregateExpensesByMonth = (expenses) => {
    const monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const monthlyExpenses = monthList.reduce((acc, month) => {
        acc[month] = 0;
        return acc;
    }, {});

    expenses.forEach(expense => {
        const month = parseDate(expense.date).toLocaleString('default', { month: 'short' });
        if (monthlyExpenses.hasOwnProperty(month)) {
            monthlyExpenses[month] += expense.amount;
        }
    });

    const sortedMonths = [...monthList];
    const sortedAmounts = sortedMonths.map(month => monthlyExpenses[month]);

    return { months: sortedMonths, amounts: sortedAmounts };
};
