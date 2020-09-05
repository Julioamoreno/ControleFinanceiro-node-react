import Modal from 'react-modal';
import React from 'react';

// import { Container } from './styles';

export default function controllers({ modalIsOpen, closeModal }) {
	const customStyles = {
		content: {
			top: '50%',
			left: '50%',
			right: 'auto',
			bottom: 'auto',
			marginRight: '-50%',
			transform: 'translate(-50%, -50%)',
		},
	};

	const handleTipeTransaction = event => {
		console.log(event.target.id);
		if (event.target.checked) {
			event.target.removeAttribute('checked');
		} else {
			event.target.setAttribute('checked', true);
		}
	};
	return (
		<Modal
			isOpen={modalIsOpen}
			onRequestClose={closeModal}
			style={customStyles}
			contentLabel="Example Modal"
		>
			{/* <h2 ref={_subtitle => (subtitle = _subtitle)}>Hello</h2> */}
			<button onClick={closeModal}>close</button>
			<form>
				<div>
					<div>
						<label htmlFor="despesaRadio">
							<input
								id="despesaRadio"
								type="radio"
								onClick={handleTipeTransaction}
							/>
							<span>Despesa</span>
						</label>
						<label htmlFor="receitaRadio">
							<input
								id="receitaRadio"
								type="radio"
								onClick={handleTipeTransaction}
							/>
							<span>Receita</span>
						</label>
					</div>
					<div className="input-field">
						<input id="inputDescription" type="text" required />
						<label htmlFor="inputDescription">Descrição:</label>
					</div>
					<div className="input-field">
						<input id="inputCategory" type="text" required />
						<label htmlFor="inputCategory">Categoria:</label>
					</div>
					<div>
						<div>
							<input
								id="inputValue"
								type="number"
								min="0"
								step="0.01"
								value="0"
								required
							/>
							<label htmlFor="inputValue">Valor:</label>
						</div>
						<input
							className="browser-default"
							placeholder="Data"
							type="date"
							required
							value={Date.now()}
						/>
					</div>
				</div>
			</form>
		</Modal>
	);
}
