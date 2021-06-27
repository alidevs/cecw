import React, { Component } from 'react'

import Form from './Form'

import { Redirect } from 'react-router'

export default class Login extends Component {
	constructor(props) {
		super(props)

		this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this)
	}

	handleSuccessfulAuth(data) {
		this.props.handleLogin(data)
	}

	render() {
		if (this.props.isLoggedIn === 'LOGGED_IN') {
			return <Redirect to='/hello' />
			// return this.props.history.replace('/whale')
		}

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
									<p>نظام تخزين الودائع</p>
								</div>
								<Form handleSuccessfulAuth={this.handleSuccessfulAuth} />
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}