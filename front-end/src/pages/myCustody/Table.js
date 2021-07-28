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
							<td>رقم العنصر</td>
                            <td>العنصر</td>
                        <td>الفئة</td>
                        <td>الكمية</td>
                        
                        
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
