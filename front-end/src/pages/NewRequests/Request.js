import React, { Component } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

export default class Request extends Component {

	constructor() {
		super()

		this.state = {
			category: '',
			quantity: '',
			itemId: '',
			type: 'Request',
			count: ''
		
		}

		this.handleDropdownChange = this.handleDropdownChange.bind(this)
		this.handleItemChange = this.handleItemChange.bind(this)
		this.handleFieldsChange = this.handleFieldsChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleDropdownChange(event) {
			
			this.setState({
				category: event.target.value,

			})
		
		
	}
	handleItemChange(event) {
		const countItem = this.props.items.find((value) => value._id === event.target.value)

			this.setState({
				itemId: event.target.value,
				count: countItem.count
			})
		
		
	}

	handleFieldsChange(event) {
		
		
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit(event) {
		event.preventDefault()
		
		const token = localStorage.getItem('token')

		axios({
			method: 'POST',
			url: 'http://localhost:3000/item/request',
			headers: {
				Authorization: `Bearer ${token}`
			},
			data: this.state
		})
		.then((response) => {
			console.table(response)
			toast.success('تم تقديم الطلب')
		})
	}

	areFieldsFilled() {
		const { category, itemId,  quantity, count } = this.state
		return category.length > 0  && quantity.length > 0 && itemId.length > 0 && count > 0 && count >= quantity
	}

	render() {
		let filterCat = this.props.items.filter((e) => {
			
			return e.category.includes(this.state.category) //&& e.count > 0
		})

		return (
			<div className="returnItem">
				<div className="title">طلب عُهدة</div>
				<div className="content">
					<form onSubmit={this.handleSubmit}>
						<div className="user-details">
							<div className="input-box">
								<label htmlFor="sort"><span className="details">الفئة:</span></label>

								<select 
								className="input-box" 
								name="_id" 
								id="Item" 
								onChange={this.handleDropdownChange} 
								defaultValue={'-'}
								required
								>
									<option value="-" disabled>-</option>
									<option value="Electronic Devices">Electronic Devices</option>
									<option value="Office Supplies">Office Supplies</option>
									<option value="Management Tools">Management Tools</option>
									
								</select>
							</div>
							
							
							<div className="input-box">
								<label htmlFor="sort"><span className="details"> العنصر:</span></label>

								<select 
								className="input-box" 
								name="item" 
								value={this.state.role}
								onChange={this.handleItemChange} 
								defaultValue={'-'}
								id="item"
								required
								>
									<option value="-" disabled>-</option>
									
									{filterCat.map((items, index) => (
										<option key={index} value={items._id}>{items.name}</option>
									))}
								</select>
							</div>
							<div className="input-box">
								<span className="details">العدد:</span>
								<input 
								type="number"
								name="quantity"
								
								onChange={this.handleFieldsChange}
								
								required
								/>
							</div>

						</div>
						<div className="button">
							<input
							type="submit"
							value="Request"
							/>
						</div>
					</form>
				</div>
			</div>
		)
	}
}
