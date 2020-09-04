const {
	TransactionModel: Transaction,
	ObjectId,
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

	update: async (req, res) => {
		if (!req.body) {
			return res.status(400).send({
				message: 'Dados para atualizacao vazio',
			});
		}

		const id = req.params.id;
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
		try {
			const retorno = await Transaction.findByIdAndUpdate(
				{ _id: id },
				{
					category,
					day,
					description,
					month,
					type,
					value,
					year,
					yearMonthDay,
				}
			);
			res.send(retorno);
		} catch (error) {
			res
				.status(500)
				.send({ message: 'Erro ao atualizar, o id: ' + id });
		}
	},

	remove: async (req, res) => {
		const id = req.params.id;

		try {
			const retorno = await Transaction.findByIdAndDelete({
				_id: id,
			});
			res.send(retorno);
		} catch (error) {
			res.status(500).send({
				message: 'Nao foi possivel deletar a transação id: ' + id,
			});
		}
	},
};
