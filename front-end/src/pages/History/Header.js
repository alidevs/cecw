
import React, { Component } from 'react'

export default class Header extends Component {
	render() {
		return (
			<div>
				<title>جميع الموظفين</title>
				<link rel="stylesheet" href={`${process.env.PUBLIC_URL}/stylesheets/employeeDashboard.css`} />
				<div className="title"><span>سجل الطلبات</span></div>
			</div>
		)
	}
}
