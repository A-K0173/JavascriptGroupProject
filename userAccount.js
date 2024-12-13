class User {
    constructor(username, pin, balance) {
        this.username = username;
        this.pin = pin;
        this.balance = balance;
        this.loginAttempts = 0;
        this.failedLogins = 0;
    }

    authenticate(inputPin) {
        if (this.failedLogins >= 10) {
            return 'locked';
        }
        if (inputPin === this.pin) {
            this.loginAttempts = 0;
            return true;
        } else {
            this.loginAttempts++;
            this.failedLogins++;
            if (this.loginAttempts >= 3) {
                return 'exit';
            }
            return false;
        }
    }

    viewBalance() {
        return this.balance;
    }

    deposit(amount) {
        if (amount > 0) {
            this.balance += amount;
            return true;
        }
        return false;
    }

    withdraw(amount) {
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;
            return true;
        }
        return false;
    }
}

const user = new User('jerome@example.com', '1234', 1000);
let currentScreen = 'login';

function showScreen(screenId) {
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('transaction-screen').classList.add('hidden');
    document.getElementById(screenId).classList.remove('hidden');
    currentScreen = screenId;
}

function authenticate() {
    const email = document.getElementById('email').value;
    const pin = document.getElementById('pin').value;

    if (email !== user.username) {
        document.getElementById('login-error').innerText = 'Invalid email';
        return;
    }

    const authResult = user.authenticate(pin);
    if (authResult === true) {
        showScreen('main-menu');
    } else if (authResult === 'locked') {
        document.getElementById('login-error').innerText = 'Account is locked due to too many failed attempts.';
    } else if (authResult === 'exit') {
        document.getElementById('login-error').innerText = 'Too many attempts. Exiting...';
        setTimeout(() => location.reload(), 2000);
    } else {
        document.getElementById('login-error').innerText = 'Invalid PIN. Try again.';
    }
}

function showViewBalance() {
    alert(`Your balance is $${user.viewBalance().toFixed(2)}`);
}

function showDepositFunds() {
    document.getElementById('transaction-title').innerText = 'Deposit Funds';
    showScreen('transaction-screen');
}

function showWithdrawFunds() {
    document.getElementById('transaction-title').innerText = 'Withdraw Funds';
    showScreen('transaction-screen');
}

function completeTransaction() {
    const amount = parseFloat(document.getElementById('transaction-amount').value);
    const errorElement = document.getElementById('transaction-error');

    if (isNaN(amount) || amount <= 0) {
        errorElement.innerText = 'Please enter a valid amount';
        return;
    }

    if (currentScreen === 'transaction-screen' && document.getElementById('transaction-title').innerText === 'Deposit Funds') {
        user.deposit(amount);
        alert(`Deposit successful. Your new balance is $${user.viewBalance().toFixed(2)}`);
    } else if (currentScreen === 'transaction-screen' && document.getElementById('transaction-title').innerText === 'Withdraw Funds') {
        if (user.withdraw(amount)) {
            alert(`Withdrawal successful. Your new balance is $${user.viewBalance().toFixed(2)}`);
        } else {
            errorElement.innerText = 'Insufficient funds';
            return;
        }
    }

    goBackToMenu();
}

function goBackToMenu() {
    showScreen('main-menu');
}

function logout() {
    location.reload();
}