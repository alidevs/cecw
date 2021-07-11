
import React, { Component } from 'react'

export default class Header extends Component {
	render() {
		return (
			<div>
				<title>جميع الموظفين</title>
				<link rel="stylesheet" href={`${process.env.PUBLIC_URL}/stylesheets/employeeDashboard.css`} />
				<div className="logo">
					<img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="" />
				</div>
				<div className="title"><span>تاريخ</span></div>
			</div>
		)
	}
}
