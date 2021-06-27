import React, { Component } from 'react'

export default class Table extends Component {

	render() {
		console.log(5)
		return (
			<div>
				<div className="table">
					<table>
						<thead>
							<tr>
								<td>Item</td>
								<td>Category</td>
								<td>Quantity</td>
								<td>Transaction Type</td>
								<td>Date & Time</td>
								<td>Request Source</td>
							</tr>
						</thead>

						<tbody>
							{this.props.requests.map((request, index) => (
								<tr>
									<td>{request.itemId}</td>
									<td>{request.category}</td>
									<td>{request.quantity}</td>
									<td>{request.type}</td>
									<td>{request.time}</td>
									<td>{request.requestee}</td>
								</tr>
							))}
						<tr>
							<td>HP</td>
							<td>laptop</td>
							<td>23</td>
							<td>return</td>
							<td>6/20/2021</td>
							<td>Hassan</td>
							<td>
								<input type="checkbox" />
							</td>
						</tr>
						</tbody>
					</table>
				</div>
			</div>
		)
	}
}
