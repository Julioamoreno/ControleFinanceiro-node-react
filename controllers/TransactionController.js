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
};
