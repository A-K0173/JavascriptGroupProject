// Import requred modules
var fs = require('fs');
var userJS = require('./user.js')
var eTransferJS = require('./etransfer.js')
var utilsJS = require('./utils.js')

// Create the class lol
class BankingApp {
    constructor() {
        this.users = []; // Array of User objects according to the doc
        this.pendingTransfers = []; // Array of ETransfer objects according to the doc
    }

    // load data from txt file in json
    loadData() {
        var data = fs.readFileSync('data.txt', 'utf-8');
        var parsedData = JSON.parse(data);
        this.users = parsedData.users || [];
        this.pendingTransfers = parsedData.pendingTransfers || [];
        console.log('Data loaded successfully.');
    }

    // save data from txt file in json
    saveData() {
        var data = JSON.stringify({ users: this.users, pendingTransfers: this.pendingTransfers });
        fs.writeFileSync('bankingapp_data.txt', data, 'utf-8');
        console.log('Data saved successfully.');
    }

    // display main menu to user
    mainMenu(user) {
        console.log(`\nWelcome ${user.name}! Please choose an option:\n`);
        console.log(`1. Withdraw Funds`);
        console.log(`2. Deposit Funds`);
        console.log(`3. View Balance`);
        console.log(`4. Send E-Transfer`);
        console.log(`5. Accept E-Transfer`);
        console.log(`6. Change PIN`);
        console.log(`7. Exit`);

        // Assuming input is handled externally and passed here
    }

    // handle user input from the menu
    handleUserInput(user, option) {
        try {
            switch (option) {
                case 1:
                    console.log('Withdraw Funds selected.');
                        userJS.withdraw(user)
                    break;
                case 2:
                    console.log('Deposit Funds selected.');
                        userJS.deposit(user)
                    break;
                case 3:
                        userJS.viewBalance(user)
                    break;
                case 4:
                    console.log('Send E-Transfer selected.');
                        eTransferJS.sendETransfer(user)
                    break;
                case 5:
                    console.log('Accept E-Transfer selected.');
                        eTransferJS.acceptETransfer(user)
                    break;
                case 6:
                    console.log('Change PIN selected.');
                        userJS.changePin(user)
                    break;
                case 7:
                    console.log('Exiting. Thank you for banking with us!');
                    break;
                default:
                    console.log('Invalid option. Please try again.');
            }
        } catch (error) {
            console.error('Error handling user input:', error.message);
        }
    }
}

module.exports = BankingApp