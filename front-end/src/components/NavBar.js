import React, { Component } from 'react'

export default class NavBar extends Component {
	constructor() {
		super()

		this.handleLogout = this.handleLogout.bind(this)
		this.navigateToHomepage = this.navigateToHomepage.bind(this)
	}

	handleLogout() {
		this.props.resetState()
	}

	navigateToHomepage() {
		this.props.history.push('/')
	}

	render() {
		return (
			<nav className="navbar navbar-expand-lg">
				<link rel="stylesheet" href={`${process.env.PUBLIC_URL}/stylesheets/-responsive-style.css`} />
				<link rel="stylesheet" href={`${process.env.PUBLIC_URL}/stylesheets/styles.css`} />
				<link rel="icon" type="image/png" sizes="32x32" href="images/IAU_logo_1.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="images/IAU_logo_1.png" />
				<div className="container">
					<div className="center">
					<form method="" action="">
						<a href="/#"><button className="nav-link" name="HomePageH" type="submit">
							<img src="images/IAU_logo_1.png" alt="logo" width="45" />
						</button></a>
					</form>
					</div>
					<div className="collapse navbar-collapse" id="nvbCollapse">
					<ul className="navbar-nav ml-auto">
						<li className="nav-item pl-1">
						</li>
						<li className="nav-item pl-1">
						<form method="" action="">
							<a href="/#"><button className="nav-link" name="" type="submit" onClick={this.navigateToHomepage}> الصفحة الرئيسية <i
								className="fa fa-home fa-fw mr-1"></i></button></a>
						</form>
						</li>
					</ul>
					</div>
					<div className="leftnavbar navbar-collapse" id="nvbCollapse">
					<ul className="navbar-nav ml-auto">
						<li className="dropdown">
						{/* <a className="nav-link" href="javascript:void(0);">مرحباً.. {this.props.username}<i className=" fa fa-user fa-fw mr-1"></i></a> */}
						{this.props.username ? <a className="nav-link" href="/#">مرحباً {this.props.username}<i className=" fa fa-user fa-fw mr-1"></i></a> : <div></div>}
						<div className="dropdown-content">
							<form className="" method="" action="">
								<a className="nav-link" href="/#" onClick={this.handleLogout}>تسجيل الخروج <i className="fas fa-sign-out-alt"></i></a>
							</form>
						</div>
						</li>
					</ul>
					</div>
				</div>
			</nav>
		)
	}
}
