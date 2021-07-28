import React, { Component } from 'react'
import axios from 'axios'

export default class Footer extends Component {
	constructor(props) {
		super(props)
		
		this.handleRequests = this.handleRequests.bind(this)
	}

	handleRequests(event) {
		event.preventDefault()

		const token = localStorage.getItem('token')
		const { checkedItems } = this.props
		const arrayOfUrls = []

		for (let [key, value] of checkedItems.entries()) {
			const requestUrl = `http://localhost:3000/item/request/${key}`
			if (value) {
				arrayOfUrls.push(axios({
					method: 'PATCH',
					url: requestUrl,
					headers: {
						Authorization: `Bearer ${token}`
					},
					data: {
						status: event.target.name === 'Accept' ? 'Accepted' : 'Denied'
					}
				}))
			}
		}


		
		axios.all(arrayOfUrls)
		.then(axios.spread((...responses) => {
			responses.forEach((response) => {
				if (response.status === 200) {
					this.props.reloadData()
				}
			})
		}))
		.catch((error) => console.error('FOUND AN ERROR ', error))
	}
	
	render() {
		return (
			<form>
				<div className="buttonGrid">
					<input type="submit" className="button" value="قبول" name="Accept" onClick={this.handleRequests} />
					<input type="submit" className="deny" value="رفض" name="Deny" onClick={this.handleRequests} />
				</div>
			</form>
		)
	}
}
