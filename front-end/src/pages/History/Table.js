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
                        
							</tr>
						</thead>

						<tbody>
							{this.props.requests.map((request, index) => (
								<tr>
									<td>{request._id}</td>
									<td>{request.itemId}</td>
									<td>{request.quantity}</td>
									<td>{request.type}</td>
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
