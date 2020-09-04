const {
	TransactionModel: Transaction,
} = require('../services/transactionService');

module.exports = {
	find: async (req, res) => {
		try {
			let period = await req.query.period;

			const retorno = await Transaction.find({ yearMonth: period });
			res.json(retorno);
		} catch (error) {
			res.status(500).send({
				message:
					error.message || 'Erro ao listar todos os documentos',
			});
		}
	},
	create: async (req, res) => {
		try {
			if (!req.body) {
				res.status(500).send({ message: 'Erro: Campos Vazios!' });
			}
			const {
				category,
				day,
				description,
				month,
				type,
				value,
				year,
				yearMonthDay,
			} = req.body;
			const transaction = new Transaction({
				category,
				day,
				description,
				month,
				type,
				value,
				year,
				yearMonthDay,
			});

			const retorno = await transaction.save();
			if (!retorno) {
				res.status(500).send({
					message: error.message || 'Algum erro ocorreu ao salvar',
				});
			} else {
				res.send({ message: 'Transaction inserido com sucesso' });
			}
		} catch (error) {
			res.status(500).send({
				message: error.message || 'Algum erro ocorreu ao salvar',
			});
		}
	},
};
