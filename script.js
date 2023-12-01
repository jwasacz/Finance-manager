const incomeSection = document.querySelector(".income-area");
const expensesSection = document.querySelector(".expenses-area");
const availableMoney = document.querySelector(".available-money");
const addTransactionPanel = document.querySelector(".add-transaction-panel");

const nameInput = document.querySelector("#name");
const amountInput = document.querySelector("#amount");
const categorySelect = document.querySelector("#category");

const addTransactionBtn = document.querySelector(".add-transaction");
const saveBtn = document.querySelector(".save");
const cancelBtn = document.querySelector(".cancel");
const deleteAllBtn = document.querySelector(".delete-all");

const lightStyleBtn = document.querySelector(".light");
const darkStyleBtn = document.querySelector(".dark");

let root = document.documentElement;
let ID = 0;
let categoryIcon;
let selectedCategory;
let moneyArr = [0];

const showPanel = () => {
  addTransactionPanel.style.display = "flex";
};

const closePanel = () => {
  addTransactionPanel.style.display = "none";
  clearInputs();
};

const checkForm = () => {
  if (
    nameInput.value !== "" &&
    amountInput.value !== "" &&
    categorySelect.value !== "none"
  ) {
    createNewtransaction();
  } else {
    alert("Wypełnij wszystkie pola!");
  }
};

const clearInputs = () => {
  nameInput.value = "";
  amountInput.value = "";
  categorySelect.selectedIndex = 0;
};

const createNewtransaction = () => {
  const newTransaction = document.createElement("div");
  newTransaction.classList.add("transaction");
  newTransaction.setAttribute("id", ID);

  checkCategory(selectedCategory);

  newTransaction.innerHTML = ` 
    <p class="transaction-name">${categoryIcon} ${nameInput.value}</p>
    <p class="transaction-amount">${amountInput.value}$ 
    <button class="delete" onclick='deleteTransaction(${ID})'><i class="fas fa-times"></i></button>
    </p> `;

  if (
    amountInput.value > 0 &&
    categorySelect.options[categorySelect.selectedIndex].text ===
      "[ + ] Przychód"
  ) {
    incomeSection.appendChild(newTransaction);
    newTransaction.classList.add("income");
    moneyArr.push(parseFloat(amountInput.value));
    countMoney(moneyArr);
    closePanel();
    clearInputs();
    ID++;
  } else if (
    amountInput.value < 0 &&
    (categorySelect.options[categorySelect.selectedIndex].text ===
      "[ - ] Kino" ||
      categorySelect.options[categorySelect.selectedIndex].text ===
        "[ - ] Jedzenie" ||
      categorySelect.options[categorySelect.selectedIndex].text ===
        "[ - ] Zakupy")
  ) {
    expensesSection.appendChild(newTransaction);
    newTransaction.classList.add("expense");
    moneyArr.push(parseFloat(amountInput.value));
    countMoney(moneyArr);
    closePanel();
    clearInputs();
    ID++;
  } else {
    alert("Kwota nie jest zgodna z kategorią");
  }

  // amountInput.value > 0 ? incomeSection.appendChild(newTransaction) && newTransaction.classList.add('icome') : expensesSection.appendChild(newTransaction) &&
  // newTransaction.classList.add('expense')
  // moneyArr.push(parseFloat(amountInput.value))
};

const selectCategory = () => {
  selectedCategory = categorySelect.options[categorySelect.selectedIndex].text;
};

const checkCategory = (transaction) => {
  switch (transaction) {
    case "[ + ] Przychód":
      categoryIcon = '<i class="fas fa-money-bill-wave"></i>';
      break;

    case "[ - ] Zakupy":
      categoryIcon = '<i class="fas fa-cart-arrow-down"></i>';
      break;

    case "[ - ] Jedzenie":
      categoryIcon = '<i class="fas fas fa-hamburger"></i>';
      break;

    case "[ - ] Kino":
      categoryIcon = '<i class="fas fas fa-film"></i>';
      break;
  }
};

const countMoney = (money) => {
  const newMoney = money.reduce((a, b) => a + b);
  availableMoney.textContent = `${newMoney}zł`;
};

const deleteTransaction = (id) => {
  const transactionToDelete = document.getElementById(id);

  const transactionAmount = parseFloat(
    transactionToDelete.childNodes[3].innerText
  );
  const indexOfTansaction = moneyArr.indexOf();
  console.log(transactionAmount);

  moneyArr.splice(indexOfTansaction, 1);

  transactionToDelete.classList.contains("income")
    ? incomeSection.removeChild(transactionToDelete)
    : expensesSection.removeChild(transactionToDelete);

  countMoney(moneyArr);
};

const deleteAllTransaction = () => {
  incomeSection.innerHTML = "<h3> Przychód </h3>";
  expensesSection.innerHTML = "<h3>Wydatki</h3>";
  availableMoney.textContent = "0zł";
  moneyArr = [0];
};

const changeStyleToLight = () => {
  root.style.setProperty("--first-color", "#F9F9F9");
  root.style.setProperty("--second-color", "#14161F");
  root.style.setProperty("--border-color", "rgba(0, 0, 0, .2");
};

const changeStyleDark = () => {
  root.style.setProperty("--first-color", "#14161F");
  root.style.setProperty("--second-color", "#F9F9F9");
  root.style.setProperty("--border-color", "rgba(255, 255, 255, .4");
};

addTransactionBtn.addEventListener("click", showPanel);
cancelBtn.addEventListener("click", closePanel);
saveBtn.addEventListener("click", checkForm);
deleteAllBtn.addEventListener("click", deleteAllTransaction);
lightStyleBtn.addEventListener("click", changeStyleToLight);
darkStyleBtn.addEventListener("click", changeStyleDark);
