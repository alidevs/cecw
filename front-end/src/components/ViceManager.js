/* eslint-disable */
import React, { Component } from 'react'
import {Link } from "react-router-dom";

export default class ViceManager extends Component {

	render() {
		return (
            <div>
            <meta charSet="UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="stylesheet" href="./styles/style.css" />
            <link rel="icon" type="image/png" sizes="32x32" href="images/IAU_logo_1.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="images/IAU_logo_1.png" />
            <meta name="msapplication-TileColor" content="#da532c" />
            <meta name="theme-color" content="#ffffff" />
            <link rel="stylesheet" href={`${process.env.PUBLIC_URL}/stylesheets/styles.css`} />

            {/* favicons */}
            <link href="https://use.fontawesome.com/releases/v5.0.7/css/all.css" rel="stylesheet" />
            <link rel="stylesheet" type="text/css" href="styles/style.css " />
            <link rel="stylesheet" type="text/css" href="styles/custom-responsive-style.css" />
            <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
            <link rel="stylesheet" media="screen" href="http://fontlibrary.org/face/hacen-tunisia" type="text/css" />
            <link href="http://fonts.cdnfonts.com/css/hacen-tunisia-bd" rel="stylesheet" />
            <title>صفحة نائب المدير</title>
            <div className="register">
              <div className="container">
                <div className="left-side-HP"  style={{background: 'url(./images/ManagerBG.jpg) no-repeat 100% 50%', backgroundSize: 'cover'}}>
                  {/* <div className="img">
        
            </div> */}
                </div>
                <div className="right-side-HP">
                  <div className="right-container-HP">
                    <div className="logoM">
                      <img src="images/logo.png" alt="" />
                    </div>
                    <div className="headerHP">
                      <h5>Warehouse Management System Dashboard</h5>
                      {/* Replace Vice Manager with <<Username>>(BackEnd)*/}
                      <h6>Welcome Vice Manager Page</h6>
                    </div>
                    <section id="Gain">
                      <div className="container">
                        {/* العنواين اليي فوق المربعات */}
                        <div className="row">
                          <div onclick="location.href=''" className="col-xs-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                          <Link to="/admin/requests">
                            <div style={{textAlign: 'center'}} className="each-icon box-4">
                              <div className="icon-wrap">
                                <i className="fa fa-list-ul" />
                                <h3 style={{color: '#F3EFE3'}}>Check Employees Custody Requests</h3>
                              </div>
                              <div className="icon-text">
                                <h3>Check Employees Custody Requests...des</h3>
                                <p>Check Employees Custody Requests...des</p>
                                <div className="cta">
                                  <a title="Click to go to..." href="javascript:void(0);"><i className="fa fa-arrow-right" aria-hidden="true" /></a>
                                </div>
                              </div>
                            </div>
                            </Link>
                          </div>
                          <div onclick="location.href=''" className="col-xs-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                          <Link to="">
                            <div style={{textAlign: 'center'}} className="each-icon box-3">
                              <div className="icon-wrap">
                                <i className="fas fa-plus-circle" />
                                <h3 style={{color: '#F3EFE3'}}>Items Menu</h3>
                              </div>
                              <div className="icon-text">
                                <h3>Items Menu...des</h3>
                                <p>Items Menu...des</p>
                                <div className="cta">
                                  <a title="Click to go to..." href="javascript:void(0);"><i className="fa fa-arrow-right" aria-hidden="true" /></a>
                                </div>
                              </div>
                            </div>
                            </Link>
                          </div>
                          <div onclick="location.href=''" className="col-xs-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                          <Link to="/history">
                            <div style={{textAlign: 'center'}} className="each-icon box-2">
                              <div className="icon-wrap">
                                <i className="fa fa-history" />
                                <h3 style={{color: '#F3EFE3'}}>Custody History</h3>
                              </div>
                              <div className="icon-text">
                                <h3>Custody History...des</h3>
                                <p>Custody History...des</p>
                                <div className="cta">
                                  <a title="Click to go to..." href="javascript:void(0);"><i className="fa fa-arrow-right" aria-hidden="true" /></a>
                                </div>
                              </div>
                            </div>
                            </Link>
                          </div>
                          <div onclick="location.href=''" className="col-xs-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                          <Link to="">
                            <div style={{textAlign: 'center'}} className="each-icon box-1">
                              <div className="icon-wrap">
                                <i className="fas fa-check-double" />
                                <h3 style={{color: '#F3EFE3'}}>Request/Return Custody Items</h3>
                              </div>
                              <div className="icon-text">
                                <h3>Request/Return Custody Items...des</h3>
                                <p>Request/Return Custody Items...des</p>
                                <div className="cta">
                                  <a title="Click to go to..." href="javascript:void(0);"><i className="fa fa-arrow-right" aria-hidden="true" /></a>
                                </div>
                              </div>
                            </div>
                            </Link>
                          </div>
                          <div onclick="location.href=''" className="col-xs-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                          <Link to="/mycustody">
                            <div style={{textAlign: 'center', width: '51rem'}} className="each-icon box-2">
                              <div className="icon-wrap">
                                <i className="fas fa-cubes" />
                                <h3 style={{color: '#F3EFE3'}}>My Custody Items</h3>
                              </div>
                              <div className="icon-text">
                                <h3>My Custody Items...des</h3>
                                <p>My Custody Items...des</p>
                                <div className="cta">
                                  <a title="Click to go to..." href="javascript:void(0);"><i className="fa fa-arrow-right" aria-hidden="true" /></a>
                                </div>
                              </div>
                            </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
            {/*  */}
          </div>
		)
	}
}
