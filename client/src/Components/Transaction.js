import React from 'react';

import './transaction.css';

export default function Components({
	day,
	category,
	description,
	value,
	color,
}) {
	return (
		<div
			className="transaction"
			style={{
				backgroundColor: color,
			}}
		>
			<span className="transaction-day">{day}</span>
			<div className="group2">
				<div className="transaction-group">
					<span className="transaction-category">{category}</span>
					<span className="transaction-description">
						{description}
					</span>
				</div>
				<span className="transaction-value">{value}</span>
			</div>

			<div className="transaction-group-button">
				<span className="material-icons button">edit</span>
				<span className="material-icons button">delete</span>
			</div>
		</div>
	);
}
