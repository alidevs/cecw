import React, { Component } from 'react'

export default class Table extends Component {

	render() {
		return (
			<div>
				<div className="table">
					<table>
						<thead>
							<tr>
								<td>العنصر</td>
								<td>نوع المعاملة</td>
								<td>العدد</td>
								<td>الحالة</td>
								<td>التاريخ والوقت</td>
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
