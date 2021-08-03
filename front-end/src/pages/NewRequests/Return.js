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
			type: 'Return',
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
		const { category, itemId,  quantity } = this.state
		return category.length > 0  && quantity.length > 0 && itemId.length > 0 //&& count > 0 //&& count >= quantity
	}

	render() {
		// let filterCat = this.props.ReturnItem.filter((e) => {
			
		// 	return e.category.toLowerCase().includes(this.state.category.toLowerCase()) //&& e.count > 0
		// })
		// let countItem
		// if(this.state.count === 0){
		// 	 countItem =  <span style = {{color: "red"}}>غير متوفر حاليا</span>
			
		// }else if(this.state.count > 0){
		// 	countItem =  <span>العدد المتوفر : {this.state.count}</span>
		// }

		return (
			<div className="returnItem">
				<div className="title">إرجاع عُهدة</div>
				<div className="content">
					<form onSubmit={this.handleSubmit}>
						<div className="user-details">
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
									{console.log(this.props.items)}
									{console.log("this.props.ReturnItem")}
									{this.props.items.map((item, index) => (
										<option key={index} value={item._id}>{item.name}</option>
									))}
								</select>
							</div>

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
								<span className="details">الكمية:</span>
								<input 
								type="number"
								name="quantity"
								
								onChange={this.handleFieldsChange}
								
								required
								/>
							</div>
							{/* <div>{countItem}</div> */}

						</div>
						<div className="button">
							<input
							type="submit"
							value="Return"
							/>
						</div>
					</form>
				</div>
			</div>
		)
	}
}
