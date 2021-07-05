import React, { Component } from 'react'

export default class Admin extends Component {

	render() {
		return (
			<div>
				<link rel="stylesheet" href={`${process.env.PUBLIC_URL}/stylesheets/styles.css`} />
				<div className="register">
					<div className="container">
						<div className="left-side">
						</div>
						<div className="right-side">
							<div className="right-container">
								<div className="logo">
									<img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="" />
								</div>
								<div className="header">
									<p>صفحة المدير</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				
			</div>
		)
	}
}
