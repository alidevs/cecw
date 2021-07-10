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
                        <td>Item ID</td>
                        
                        
							</tr>
						</thead>

						<tbody>
							{this.props.requests.map((request, index) => (
								<tr>
									<td>{request.record.description}</td>
									<td>{request.record.category}</td>
									<td>{request.record.quantity}</td>
									<td>{request.record._id}</td>
									
								</tr>
							))}
						
						</tbody>
					</table>
				</div>
			</div>
		)
	}
}
