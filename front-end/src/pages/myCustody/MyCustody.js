import React, { Component } from 'react'
import axios from 'axios'
import Table from './Table'
import Header from './Header'

export default class MyCustody extends Component {
	constructor() {
		super()

		this.state = {
			requests: [],
			errors: ''
		}

	}

	componentDidMount() {
		const token = localStorage.getItem('token')
		const user = JSON.parse(localStorage.getItem('user'))
        

		axios.get(`http://localhost:3000/users/${user._id}/custody`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then((response) => {
			switch (response.status) {
				case 200:
					this.setState({
						requests: response.data
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
		.catch((error) => {
			console.error(`Error: A problem has occured while fetching requests list`, error)
		})
	}

	render() {
        console.log(this.state.requests)
		if (this.state.errors !== '') {
			return <div>{this.state.errors}</div>
		}
		return (
			<div>
				<Header />
                <Table requests={this.state.requests} />

			</div>
		)
	}
}
