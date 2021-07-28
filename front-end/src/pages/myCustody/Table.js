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
								<td>Item ID</td>
								<td>Item</td>
								<td>Category</td>
								<td>Quantity</td>
							</tr>
						</thead>

						<tbody>
							{this.props.requests.map((request, index) => (
								<tr>
									<td>{request._id}</td>
									<td>{request.name}</td>
									<td>{request.category}</td>
									<td>{request.count}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		)
	}
}
