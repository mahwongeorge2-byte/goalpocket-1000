
/* ==================================
   GOALPOCKET 1000 — APP ENGINE
================================== */

// 1. APPLICATION SETTINGS

const app = {
  name: "GOALPOCKET",
  version: "1000",
  currency: "USD"
};

console.log(`${app.name} ${app.version} initialized!`);


// 2. SAMPLE TRANSACTION DATA

// These are demonstration figures, not real bank records.

let transactions = [
  {
    name: "Project payment",
    category: "Income",
    amount: 500,
    type: "income",
    date: "Today"
  },
  {
    name: "School supplies",
    category: "Education",
    amount: 45,
    type: "expense",
    date: "Yesterday"
  },
  {
    name: "Freelance project",
    category: "Income",
    amount: 1900,
    type: "income",
    date: "Earlier"
  },
  {
    name: "Transport",
    category: "Transport",
    amount: 905,
    type: "expense",
    date: "Earlier"
  }
];


// 3. FINANCIAL CALCULATIONS

function calculateTotals() {
  const income = transactions
    .filter(item => item.type === "income")
    .reduce((total, item) => total + item.amount, 0);

  const expenses = transactions
    .filter(item => item.type === "expense")
    .reduce((total, item) => total + item.amount, 0);

  const balance = income - expenses;

  return {
    income,
    expenses,
    balance
  };
}


// 4. DISPLAY FINANCIAL TOTALS

function updateDashboard() {
  const totals = calculateTotals();

  document.getElementById("totalBalance").textContent =
    formatMoney(totals.balance);

  document.getElementById("totalIncome").textContent =
    "+" + formatMoney(totals.income);

  document.getElementById("totalExpenses").textContent =
    "-" + formatMoney(totals.expenses);

  renderTransactions();
  generateInsight(totals);
}


// 5. CURRENCY FORMATTING

function formatMoney(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: app.currency
  }).format(amount);
}


// 6. TRANSACTION DISPLAY

function renderTransactions() {
  const list = document.getElementById("transactionList");

  list.innerHTML = "";

  transactions.forEach(item => {
    const row = document.createElement("div");
    row.className = "transaction";

    const details = document.createElement("div");

    const name = document.createElement("strong");
    name.textContent = item.name;

    const description = document.createElement("p");
    description.className = "muted";
    description.textContent =
      `${item.category} · ${item.date}`;

    details.append(name, description);

    const amount = document.createElement("strong");
    amount.className =
      item.type === "income" ? "income" : "expense";

    amount.textContent =
      (item.type === "income" ? "+" : "-") +
      formatMoney(item.amount);

    row.append(details, amount);
    list.appendChild(row);
  });
}


// 7. ADD TRANSACTIONS

function addTransaction() {
  const name = prompt("Enter transaction name:");

  if (!name || !name.trim()) return;

  const amount = Number(
    prompt("Enter amount in USD:")
  );

  if (!Number.isFinite(amount) || amount <= 0) {
    alert("Please enter a valid positive amount.");
    return;
  }

  const type = prompt(
    'Type "income" or "expense":'
  );

  if (!type) return;

  const normalizedType = type.trim().toLowerCase();

  if (!["income", "expense"].includes(normalizedType)) {
    alert('Please enter either "income" or "expense".');
    return;
  }

  transactions.unshift({
    name: name.trim(),
    category: normalizedType === "income" ? "Income" : "General",
    amount,
    type: normalizedType,
    date: "Today"
  });

  updateDashboard();

  alert("Transaction added successfully!");
}


// 8. BASIC SPENDING INSIGHTS

function generateInsight(totals) {
  const insight = document.getElementById("aiInsight");

  if (totals.income === 0 && totals.expenses === 0) {
    insight.textContent =
      "Add transactions to begin exploring your finances.";
    return;
  }

  if (totals.balance < 0) {
    insight.textContent =
      "Your recorded expenses are higher than your recorded income. Review your transactions.";
  } else {
    insight.textContent =
      `Your recorded balance is ${formatMoney(totals.balance)}. ` +
      "Keep tracking your transactions to understand your spending patterns.";
  }
}


// 9. CONNECT THE ADD BUTTON

document
  .getElementById("addTransaction")
  .addEventListener("click", addTransaction);


// 10. START THE APPLICATION

updateDashboard();
