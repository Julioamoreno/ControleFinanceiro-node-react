import React, { useState, useEffect } from 'react';

import './app.css';

import api from './Services/TransactionService';
import Transaction from './Components/Transaction';

export default function App() {
	const [transactions, setTransactions] = useState([]);
	const [period, setPeriod] = useState('2020-09');
	const [allMonth, setAllMonth] = useState([
		{ yearMonth: '2019-01', month: '01', year: '2019' },
		{ yearMonth: '2019-02', month: '02', year: '2019' },
		{ yearMonth: '2019-03', month: '03', year: '2019' },
		{ yearMonth: '2019-04', month: '04', year: '2019' },
		{ yearMonth: '2019-05', month: '05', year: '2019' },
		{ yearMonth: '2019-06', month: '06', year: '2019' },
		{ yearMonth: '2019-07', month: '07', year: '2019' },
		{ yearMonth: '2019-08', month: '08', year: '2019' },
		{ yearMonth: '2019-09', month: '09', year: '2019' },
		{ yearMonth: '2019-10', month: '10', year: '2019' },
		{ yearMonth: '2019-11', month: '11', year: '2019' },
		{ yearMonth: '2019-12', month: '12', year: '2019' },
		{ yearMonth: '2020-01', month: '01', year: '2020' },
		{ yearMonth: '2020-02', month: '02', year: '2020' },
		{ yearMonth: '2020-03', month: '03', year: '2020' },
		{ yearMonth: '2020-04', month: '04', year: '2020' },
		{ yearMonth: '2020-05', month: '05', year: '2020' },
		{ yearMonth: '2020-06', month: '06', year: '2020' },
		{ yearMonth: '2020-07', month: '07', year: '2020' },
		{ yearMonth: '2020-08', month: '08', year: '2020' },
		{ yearMonth: '2020-09', month: '09', year: '2020' },
		{ yearMonth: '2020-10', month: '10', year: '2020' },
		{ yearMonth: '2020-11', month: '11', year: '2020' },
		{ yearMonth: '2020-12', month: '12', year: '2020' },
		{ yearMonth: '2021-01', month: '01', year: '2021' },
		{ yearMonth: '2021-02', month: '02', year: '2021' },
		{ yearMonth: '2021-03', month: '03', year: '2021' },
		{ yearMonth: '2021-04', month: '04', year: '2021' },
		{ yearMonth: '2021-05', month: '05', year: '2021' },
		{ yearMonth: '2021-06', month: '06', year: '2021' },
		{ yearMonth: '2021-07', month: '07', year: '2021' },
		{ yearMonth: '2021-08', month: '08', year: '2021' },
		{ yearMonth: '2021-09', month: '09', year: '2021' },
		{ yearMonth: '2021-10', month: '10', year: '2021' },
		{ yearMonth: '2021-11', month: '11', year: '2021' },
		{ yearMonth: '2021-12', month: '12', year: '2021' },
	]);
	const [receita, setReceita] = useState(0);
	const [despesa, setDespesa] = useState(0);

	useEffect(() => {
		const auto = async () => {
			const response = await api.get(period);
			setTransactions(response.data);
			console.log(response.data);
			const despesa = response.data.reduce((acc, { value, type }) => {
				if (type === '-') {
					return acc + value;
				}
				return acc;
			}, 0);
			setDespesa(despesa);
			const receita = response.data.reduce((acc, { value, type }) => {
				if (type === '+') {
					return acc + value;
				}
				return acc;
			}, 0);
			setReceita(receita);
		};
		auto();
	}, [period]);

	const changeMonth = event => {
		setPeriod(event.target.value);
	};

	return (
		<div className="container">
			<div className="center">
				<h1>Controle de finanças pessoais</h1>
			</div>
			<div
				className="center"
				style={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'center',
					margin: 10 + 'px',
				}}
			>
				<button className="waves-effect waves-light btn">
					{' < '}
				</button>
				<select
					className="browser-default"
					name="month"
					id="month"
					onChange={changeMonth}
				>
					{allMonth &&
						allMonth.map((month, idx) => {
							return (
								<option
									key={idx}
									value={month.yearMonth}
									id="month"
								>{`${month.month}/${month.year}`}</option>
							);
						})}
				</select>
				<button className="waves-effect waves-light btn">
					{' > '}
				</button>
			</div>
			<div className="stats-bar">
				<span>Lançamentos: {transactions.length}</span>
				<span>
					Receitas:{' '}
					{receita.toLocaleString('pt-br', {
						style: 'currency',
						currency: 'BRL',
						minimumFractionDigits: 2,
					})}
				</span>
				<span>
					Despesas:{' '}
					{despesa.toLocaleString('pt-br', {
						style: 'currency',
						currency: 'BRL',
						minimumFractionDigits: 2,
					})}
				</span>
				<span>
					Saldo:{' '}
					{(receita - despesa).toLocaleString('pt-br', {
						style: 'currency',
						currency: 'BRL',
						minimumFractionDigits: 2,
					})}
				</span>
			</div>

			<div className="search-bar">
				<button className="waves-effect waves-light btn">
					+ Novo lançamento
				</button>
				<div className="input-field search">
					<input type="text" placeholder="Filtro" />
				</div>
			</div>
			<div className="center">
				{transactions.map(transaction => {
					return (
						<Transaction
							day={transaction.day.toLocaleString('pt-br', {
								minimumIntegerDigits: 2,
							})}
							category={transaction.category}
							description={transaction.description}
							value={transaction.value.toLocaleString('pt-br', {
								style: 'currency',
								currency: 'BRL',
								minimumFractionDigits: 2,
							})}
							color={
								transaction.type === '+'
									? 'rgb(161, 240, 220)'
									: 'rgb(240, 161, 168)'
							}
						/>
					);
				})}
			</div>
		</div>
	);
}
