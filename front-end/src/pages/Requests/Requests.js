import React, { Component } from 'react'
import axios from 'axios'

import Table from './Table'
import Footer from './Footer'

export default class Requests extends Component {
	constructor() {
		super()

		this.state = {
			requests: [],
			checkedItems: new Map(),
			errors: ''
		}

		this.handleChange = this.handleChange.bind(this)
		this.downloadData = this.downloadData.bind(this)
	}
	
	componentDidMount() {
		this.downloadData()
	}

	downloadData() {
		const token = localStorage.getItem('token')
		axios.get('http://localhost:3000/item/request/list', {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then((response) => {
			switch (response.status) {
				case 200:
					this.setState({ requests: response.data })
					break
				
				case 401:
					this.setState({
						errors: 'You are unauthorized to make this action'
					})
					break
			
				default:
					console.log(`Response status`, response.status)
					break
			}
		})
		.catch((error) => {
			console.error(`Error: A problem has occured while fetching requests list`, error)
		})
	}
	handleChange(event) {
		const item = event.target.name
		const isChecked = event.target.checked

		this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }))
	}

	render() {
		return (
			<div>
				<div className="logo">
					<link rel="stylesheet" href={`${process.env.PUBLIC_URL}/stylesheets/custody_styleSheet.css`} />
					<img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="" />
				</div>
				<section className="container">
					<div className="title"><span> طلبات الموظفين </span></div>
					<Table requests={this.state.requests} handleRequests={this.handleChange} checkedItems={this.state.checkedItems} />
					<Footer checkedItems={this.state.checkedItems} history={this.props.history} reloadData={this.downloadData} />
				</section>
			</div>
		)
	}
}
