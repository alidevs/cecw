import React, { Component } from 'react'

export default class Table extends Component {

	render() {
		return (
			<div>
				<div className="table">
					<table>
						<thead>
							<tr>
								<td>Item</td>
								<td>Transaction Type</td>
								<td>Quantity</td>
								<td>Status</td>
								<td>Date & Time</td>
							</tr>
						</thead>

						<tbody>
							{this.props.requests.map((request, index) => (
								<tr key={index}>
									<td>{request.itemId.name}</td>
									<td>{request.type}</td>
									<td>{request.quantity}</td>
									<td>{request.status}</td>
									<td>{request.time}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		)
	}
}
