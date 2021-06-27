import React, { Component } from 'react'


export default class Header extends Component {
	render() {
		return (
			<div>
				<title>طلبات الموظفين</title>
				<link rel="stylesheet" href={`${process.env.PUBLIC_URL}/stylesheets/custody_styleSheet.css`} />
				<div className="logo">
					<img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="" />
				</div>
				<div className="title"><span> طلبات الموظفين </span></div>
			</div>
		)
	}
}
