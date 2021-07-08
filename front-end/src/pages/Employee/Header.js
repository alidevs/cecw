
import React, { Component } from 'react'
import {Link } from "react-router-dom";

export default class Header extends Component {
	render() {
		return (
			<div>
				<title>جميع الموظفين</title>
				<link rel="stylesheet" href={`${process.env.PUBLIC_URL}/stylesheets/employeeDashboard.css`} />
				<div className="logo">
					<img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="" />
				</div>
				<div className="title"><span>جميع الموظفين</span></div>

                <div class="card">
            <div> <Link to="/admin/requests">لوحة تحكم المستخدمين</Link></div>
            <div class="iconbox"> 
                <img src="https://img.icons8.com/ios/50/000000/edit-administrator.png"/>
                
              
            
            
            </div>
        </div>
      

			</div>
		)
	}
}
