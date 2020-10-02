const mongoose = require('mongoose');
const TransactionModel = require('../models/TransactionModel');

const transactionData = {
	description: 'teste',
	value: 99,
	category: 'teste unitario',
	year: 2020,
	month: 10,
	day: 1,
	yearMonth: '2020-10',
	yearMonthDay: '2020-10-01',
	type: '+',
};

describe('Transaction Model test', () => {
	// It's just so easy to connect to the MongoDB Memory Server
	// By using mongoose.connect
	beforeAll(async () => {
		await mongoose.connect(
			global.__MONGO_URI__,
			{ useNewUrlParser: true, useCreateIndex: true },
			err => {
				if (err) {
					console.error(err);
					process.exit(1);
				}
			}
		);
	});

	it('create e save transaction succesfully', async () => {
		const validTransaction = new TransactionModel(transactionData);
		const savedTransaction = await validTransaction.save();

		expect(savedTransaction._id).toBeDefined();
		expect(savedTransaction.description).toBe(
			transactionData.description
		);
		expect(savedTransaction.value).toBe(transactionData.value);
		expect(savedTransaction.category).toBe(transactionData.category);
		expect(savedTransaction.year).toBe(transactionData.year);
		expect(savedTransaction.month).toBe(transactionData.month);
		expect(savedTransaction.day).toBe(transactionData.day);
		expect(savedTransaction.yearMonth).toBe(
			transactionData.yearMonth
		);
		expect(savedTransaction.yearMonthDay).toBe(
			transactionData.yearMonthDay
		);
		expect(savedTransaction.type).toBe(transactionData.type);
	});
});
