import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";
let projectTitle = "My-Bank Console App";
console.log(chalk.blueBright(figlet.textSync(projectTitle, { font: 'Standard' })));
// Bank Account Class
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    // Debit Cash
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(chalk.greenBright(`\nAmount Withdraw Successfully: $${amount} \nRemaining Balance: $${this.balance}`));
            console.log(chalk.greenBright("-".repeat(50)));
        }
        else {
            console.log(chalk.red("\nInsufficient balance..."));
            console.log(chalk.red("-".repeat(50)));
        }
    }
    // Credit Cash
    deposit(amount) {
        if (amount > 100) {
            amount -= 1;
        }
        this.balance += amount;
        console.log(chalk.cyanBright(`\nAmount Depposit Successfully: $${amount} \nAccount Balance: $${this.balance}`));
        console.log(chalk.cyanBright("-".repeat(50)));
    }
    // Checking Balance
    checkBalance() {
        console.log(chalk.yellowBright(`\nCurrent Balance: $${this.balance}`));
        console.log(chalk.yellowBright("-".repeat(50)));
    }
}
// Create Customer Class
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
// Create Bank Accounts
const accounts = [
    new BankAccount(1000, 500),
    new BankAccount(1001, 1000),
    new BankAccount(1002, 2000),
];
// Create Customers
const customers = [
    new Customer("Mubashir", "Ali", "Male", 25, 3173910050, accounts[0]),
    new Customer("Muhammad", "Hamza", "Male", 28, 3413910050, accounts[1]),
    new Customer("Almas", "Ansari", "Female", 30, 3333910050, accounts[2])
];
// Function to interact with bank account
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "\nEnter your account number:"
        });
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber);
        if (customer) {
            console.log(chalk.magentaBright(`\nWelcome! ${customer.firstName} ${customer.lastName}\n`));
            const ans = await inquirer.prompt({
                name: "select",
                type: "list",
                message: "Select an option",
                choices: ["Deposit", "Withdraw", "Check Balance", "EXIT"]
            });
            switch (ans.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit: $"
                    });
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to withdraw: $"
                    });
                    customer.account.withdraw(withdrawAmount.amount);
                    break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                case "EXIT":
                    console.log(chalk.red("\nExiting......"));
                    console.log(chalk.red("Thank You for using banking services."));
                    console.log(chalk.red("-".repeat(50)));
                    return;
            }
        }
        else {
            console.log(chalk.redBright("\nInvalid Account Number. Please try again"));
            console.log(chalk.redBright("-".repeat(50)));
        }
    } while (true);
}
service();
