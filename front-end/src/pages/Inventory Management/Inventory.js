import React, { Component } from 'react'
import axios from 'axios'
import $ from 'jquery'
import './inventory.css'
import { toast } from 'react-toastify'

export default class Inventory extends Component {
	constructor() {
		super()

		this.state = {
			items: [],
			selectedItem: {},
			newItem: {},
			search: '',
			showPopup: false
		}

		this.showAddNewItemPopup = this.showAddNewItemPopup.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.editRow = this.editRow.bind(this)
		this.doneEditing = this.doneEditing.bind(this)
		this.deleteRow = this.deleteRow.bind(this)
	}

	componentDidMount() {
		if (document.location.search.match(/type=embed/gi)) {
			window.parent.postMessage("resize", "*");
		}

		this.downloadData()
	}

	newItemChange(event) {
		event.preventDefault()

		console.log(this.state.newItem)
	}

	searchFieldChange(event) {
		event.preventDefault()

		console.log(event.target.value)
	}

	searchToggle(event) {
		event.preventDefault()

		let obj = event.target
		
		var container = $(obj).closest('.search-wrapper');
		if (!container.hasClass('active')) {
			container.addClass('active')
		} else if (container.hasClass('active') && $(obj).closest('.input-holder').length === 0) {
			container.removeClass('active')
			container.find('.search-input').val('')
		}
	}

	showAddNewItemPopup(event) {
		event.preventDefault()

		this.setState(({ showPopup }) => ({ showPopup: !showPopup }));
	}

	editRow(event, item) {
		event.preventDefault()

		this.setState({
			selectedItem: item
		})
	}

	handleChange(event) {
		this.setState(prevState => ({
			selectedItem : {
				...prevState.selectedItem,
				[event.target.name]: event.target.value
			}
		}))
	}

	doneEditing(event) {
		event.preventDefault()

		const token = localStorage.getItem('token')

		axios({
			method: 'PATCH',
			url: `http://localhost:3000/item/update/${this.state.selectedItem._id}`,
			headers: {
				Authorization: `Bearer ${token}`
			},
			data: this.state.selectedItem
		})
		.then((response) => {
			if (response.status === 200) {
				toast.success('Item has been updated successfully!')
				this.downloadData()
			} else {
				toast.error(`Response status ${response.status}`)
			}
			
			console.log(response)
		})
		.catch(error => {
			toast.error(`Failed to delete item.`)
		})
	}

	deleteRow(event, item) {
		event.preventDefault()
		const token = localStorage.getItem('token')

		if (window.confirm('Are you sure you wish to delete this item?')) {
			axios({
				method: 'DELETE',
				url: `http://localhost:3000/item/delete/${item._id}`,
				headers: {
					Authorization: `Bearer ${token}`
				},
			})
			.then((response) => {
				if (response.status === 200) {
					toast.success('Item has been deleted successfully!')
					this.downloadData()
				} else {
					toast.error(`Response status ${response.status}`)
				}
				
				console.log(response)
			})
			.catch(error => {
				toast.error(`Failed to delete item.`)
			})
		}
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
			this.setState({ items: response.data, selectedItem: {} })
		})
	}

	render() {
		return (
			<div className="register">
				<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet" />
				<div className="container">
					<div className="addrevpa">
						<div className="addrevpa-container">
							<div className="addrevpaheader">
								<p>
									<a href="#popup1" onClick={this.showAddNewItemPopup} >
										<input className="normalBtn" type="button" value="Add New Item" style={{position: 'absolute', right: '76%'}} />
									</a>
									إضافة او حذف الودائع
								</p>
							</div>
							<div id="popup1" className={this.state.showPopup ? 'overlay-target overlay' : 'overlay'} onClick={this.showAddNewItemPopup}>
								<div className="popup">
									<h2>Add New Item Page</h2>
									<a className="close" href="/#">&times;</a>
									<div className="content">
										<br />

										<div className="FildsPopup">
											<p>New Item Name:</p>
											<input className="inputpopup" type="text" name="ItemeNameAdd" value={this.state.newItem.name} />

											<p>New Item Description:</p>
											<input className="inputpopup" type="text" name="ItemeNameAdd" value={this.state.newItem.description} />

											<p>Quantity:</p>
											<input className="inputpopup" type="text" name="QuantityAdd" value={this.state.newItem.count} />


											<p>Catagory:</p>
											<select className="inputpopup" name="CatagoryAdd" id="" value={this.state.newItem.category} onChange={this.newItemChange}>
												<option selected></option>
												<option value="Electronic Devices">Electronic Devices</option>
												<option value="Office Supplies">Office Supplies</option>
												<option value="Management Tools">Management Tools</option>
											</select>
											<button className="normalBtn" type="submit" value="Add New Item" onClick={() => console.log("hola")}>Add New Item</button>
										</div>
										<br />
									</div>
								</div>
							</div>
							<form className="">
								<div className="search-wrapper">
									<div className="input-holder">
										<input type="text" className="search-input" placeholder="Type to search" value={this.state.search} onChange={this.searchFieldChange} />
										<button className="search-icon" onClick={this.searchToggle}><span></span></button>
									</div>
									<span className="close" onClick={this.searchToggle}></span>
								</div>
								<script src="https://cpwebassets.codepen.io/assets/common/stopExecutionOnTimeout-8216c69d01441f36c0ea791ae2d4469f0f8ff5326f00ae2d00e4bb7d20e24edb.js"></script>

								<script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'></script>

								<table className="table_select">
									<tr>
										<th>ID</th>
										<th>Item</th>
										<th>Catagory</th>
										<th>Description</th>
										<th>Quantity</th>
										<th>Actions</th>
									</tr>
									{this.state.items.map((item, index) => (
										<tr key={index}>
											<td>{item._id}</td>
											{this.state.selectedItem._id === item._id ?
											<td><input placeholder={item.name} name="name" onChange={this.handleChange}></input></td> :
											<td>{item.name}</td>}

											{this.state.selectedItem._id === item._id ?
											<td>
												<select className="inputpopup" defaultValue={item.name} name="category">
													<option value="Electronic Devices">Electronic Devices</option>
													<option value="Office Supplies">Office Supplies</option>
													<option value="Management Tools">Management Tools</option>
												</select>
											</td> : 
											<td>{item.category}</td>}
											
											{this.state.selectedItem._id === item._id ?
											<td><input placeholder={item.description} name="description"></input></td> :
											<td>{item.description}</td>}

											{this.state.selectedItem._id === item._id ?
											<td><input placeholder={item.count} name="count"></input></td> :
											<td>{item.count}</td>}

											<td>
												{this.state.selectedItem._id === item._id ?
												<button class="fas fa-check-circle" style={{color: 'green'}} onClick={this.doneEditing}></button> :
												<div>
													<button style={{color: 'orange'}} className="fas fa-pencil-alt" title="Edit the Item Name, Quantity or Catagory " name={item._id} type="button" onClick={(e) => this.editRow(e, item)}></button>
													<button style={{color: 'red'}} className="fas fa-times" title="press to delete this Item" name={item._id} type="button" onClick={(e) => this.deleteRow(e, item)}></button>
												</div>
												} 
											</td>
										</tr>
									))}
								</table>
							</form>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
