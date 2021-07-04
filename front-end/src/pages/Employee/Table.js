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
                            <td>ID</td>
                        <td>Name</td>
                        <td>Number of Custody Items</td>
                        <td>Email</td>
                        <td>position</td>
                        
							</tr>
						</thead>

						<tbody>
							{this.props.requests.map((request, index) => (
								<tr>
									<td>{request._id}</td>
									<td>{request.name}</td>
									<td>{request.email}</td>
									<td>{request.email}</td>
									<td>{request.role}</td>
									<td>{request.requestee}</td>
								</tr>
							))}
						
						</tbody>
					</table>
				</div>
			</div>
		)
	}
}
