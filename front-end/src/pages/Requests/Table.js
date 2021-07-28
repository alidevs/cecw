import React, { Component } from 'react'
import moment from 'moment'

import Checkbox from './../../components/Checkbox'

export default class Table extends Component {

	render() {
		return (
			<div className="table">
				<table>
					<thead>
						<tr>
						<td> عنصر </ td>
						<td> الفئة </td>
						<td> الكمية </ td>
						<td> نوع المعاملة </ td>
						<td> التاريخ والوقت </ td>
						<td> الطالب </ td> 
						</tr>
					</thead>

					<tbody>
						{this.props.requests.map((request, index) => (
							<tr key={index} >
								<td>{request.itemId}</td>
								<td>{request.category}</td>
								<td>{request.quantity}</td>
								<td>{request.type}</td>
								<td>{moment(request.time).format("D MMM YYYY, h:mm")}</td>
								<td>{request.requestee}</td>
								<td>
									<Checkbox name={request._id} checked={this.props.checkedItems.get(request._id)} onChange={e => this.props.handleRequests(e)} />
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		)
	}
}
