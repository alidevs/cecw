import React, { Component } from 'react'
import axios from 'axios'


import Request from './Request'
import Return from './Return'

export default class NewRequests extends Component {
	constructor() {
		super()

		this.state = {
			items: [],
			ReturnItem: []
		}

		this.downloadData = this.downloadData.bind(this)
		this.getReturnData = this.getReturnData.bind(this)
	}

	componentDidMount() {
		this.downloadData()
		this.getReturnData()
	}

	downloadData() {
		const token = localStorage.getItem('token')

		axios({
			method: 'GET',
			url: 'http://localhost:3000/item/list',
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then((response) => {
			this.setState({
				items: response.data
			})

		})
	}

	  getReturnData() {
		const token = localStorage.getItem('token')
		const user =  JSON.parse(localStorage.getItem('user'))
        

		 axios.get(`http://localhost:3000/users/${user._id}/custody`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then((response) => {
			switch (response.status) {
				case 200:
					this.setState({
						ReturnItem: response.data
					})
					console.table(response.data)
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
		
	}

	render() {
		console.log(this.state.ReturnItem)
		return (
			<div className="body">
				<link rel="stylesheet" href={`${process.env.PUBLIC_URL}/stylesheets/userManagement.css`} />
				

				<div className="leftSide">
					<Request items={this.state.items} reloadData={this.downloadData} />
				</div>
				<div className= "rightSide"></div>
				<Return items={this.state.ReturnItem} reloadData={this.getReturnData} />

			</div>
		)
	}
}
