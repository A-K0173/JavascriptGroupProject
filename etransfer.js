import fs from 'fs/promises';

class ETransfer {
    constructor(sender, recipient, amount, securityQuestion, securityAnswer) {
        this.sender = sender;
        this.recipient = recipient;
        this.amount = amount;
        this.securityQuestion = securityQuestion;
        this.securityAnswer = securityAnswer;
    }

    static async loadData() {
        try {
            const data = await fs.readFile('data.json', 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error reading data file:', error);
            return { users: [], pendingTransfers: [] };
        }
    }

    static async saveData(data) {
        try {
            await fs.writeFile('data.json', JSON.stringify(data, null, 2));
        } catch (error) {
            console.error('Error saving data file:', error);
        }
    }

    static async sendETransfer(senderEmail, recipientEmail, amount, securityQuestion, securityAnswer) {
        const data = await ETransfer.loadData();

        const sender = data.users.find(user => user.username === senderEmail);
        if (!sender) {
            console.error('Sender not found.');
            return;
        }

        if (sender.balance < amount) {
            console.error('Insufficient funds.');
            return;
        }

        const eTransfer = new ETransfer(senderEmail, recipientEmail, amount, securityQuestion, securityAnswer);

        sender.balance -= amount;
        data.pendingTransfers.push(eTransfer);

        await ETransfer.saveData(data);

        console.log(`E-Transfer of $${amount} sent to ${recipientEmail}.`);
    }

    static async acceptETransfer(recipientEmail, securityAnswer) {
        const data = await ETransfer.loadData();

        const recipient = data.users.find(user => user.username === recipientEmail);
        if (!recipient) {
            console.error('Recipient not found.');
            return;
        }

        const eTransferIndex = data.pendingTransfers.findIndex(
            transfer => transfer.recipient === recipientEmail
        );

        if (eTransferIndex === -1) {
            console.log('No pending e-transfers found.');
            return;
        }

        const eTransfer = data.pendingTransfers[eTransferIndex];

        if (eTransfer.securityAnswer !== securityAnswer) {
            console.error('Incorrect security answer.');
            return;
        }

        recipient.balance += eTransfer.amount;
        data.pendingTransfers.splice(eTransferIndex, 1);

        await ETransfer.saveData(data);

        console.log(
            `E-Transfer accepted. $${eTransfer.amount} added to your balance. New balance: $${recipient.balance}.`
        );
    }
}

export default ETransfer;
