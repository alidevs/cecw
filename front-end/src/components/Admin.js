import React, { Component } from 'react'
import {Link } from "react-router-dom";

export default class Admin extends Component {

	render() {
		return (
			<div>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/png" sizes="32x32" href="images/IAU_logo_1.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="images/IAU_logo_1.png" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="stylesheet" href={`${process.env.PUBLIC_URL}/stylesheets/styles.css`} />

        {/* favicons */}
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet" />
        <link rel="stylesheet" href={`${process.env.PUBLIC_URL}/stylesheets/custom-responsive-style.css`} />
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
        <link rel="stylesheet" media="screen" href="http://fontlibrary.org/face/hacen-tunisia" type="text/css" />
        <link href="http://fonts.cdnfonts.com/css/hacen-tunisia-bd" rel="stylesheet" />
        <title>صفحة المدير</title>
        <div className="register">
          <div className="container">
            <div className="left-side-HP"  style={{background: 'url(./images/ManagerBG.jpg) no-repeat 100% 50%', backgroundSize: 'cover'}}>
            
            </div>
            <div className="right-side-HP">
              <div className="right-container-HP">
                <div className="logoM">
                  <img src="images/logo.png" alt="" />
                </div>
                <div className="headerHP">
                <h5>نـظـام إدارة الـعُـهـد والمــخــزون</h5>
                  <h6>أهلاً بك في صفحة المدير</h6>
                </div>
                <section id="Gain">
                  <div className="container">
                    <div className="row">
                      <div onClick={() => console.log('Div clicked')} className="col-xs-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
					  <Link to="/admin/requests">

                        <div style={{textAlign: 'center'}} className="each-icon box-4">
                          <div className="icon-wrap">
                            <i className="fa fa-list-ul" />
                            <h3 style={{color: '#F3EFE3'}}>التحقق من عٌهد الموظفين</h3>
                          </div>
                          <div className="icon-text">
                            <h3>التحقق من عٌهد الموظفين</h3>
                            <p>قبول او رفض طلبات العٌهد</p>
                            <div className="cta">
                              <a title="اضغط هنا للذهاب للتحقق من عٌهد الموظفين" href="/#"><i className="fa fa-arrow-right" aria-hidden="true" />&nbsp;</a>
                            </div>
                          </div>
                        </div>
						</Link>
                      </div>
                      <div onClick={() => console.log('Div clicked')} className="col-xs-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
					  <Link to="">

                        <div style={{textAlign: 'center'}} className="each-icon box-3">
                          <div className="icon-wrap">
                            <i className="fas fa-plus-circle" />
                            <h3 style={{color: '#F3EFE3'}}>قائمة العناصر</h3>
                          </div>
                          <div className="icon-text">
                            <h3>قائمة العناصر</h3>
                            <p>لعرض جميع عناصر المستودعات</p>
                            <div className="cta">
                              <a title="اضغظ هنا للذهاب لقائمة العناصر" href="/#"><i className="fa fa-arrow-right" aria-hidden="true" />&nbsp;</a>
                            </div>
                          </div>
                        </div>
						</Link>
                      </div>
                      <div onClick={() => console.log('Div clicked')} className="col-xs-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
					  <Link to="/history">

                        <div style={{textAlign: 'center'}} className="each-icon box-2">
                          <div className="icon-wrap">
                            <i className="fa fa-history" />
                            <h3 style={{color: '#F3EFE3'}}>سجلات العُهد</h3>
                          </div>
                          <div className="icon-text">
                            <h3>سجلات العُهد</h3>
                            <p>لعرض جميع طلبات العهد</p>
                            <div className="cta">
                              <a title="اضغط هنا للذهاب لسجلات العٌهد" href="/#"><i className="fa fa-arrow-right" aria-hidden="true" />&nbsp;</a>
                            </div>
                          </div>
                        </div>
						</Link>
                      </div>
                      <div onClick={() => console.log('Div clicked')} className="col-xs-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
					  <Link to="/admin/employees/manage">

                        <div style={{textAlign: 'center'}} className="each-icon box-1">
                          <div className="icon-wrap">
                            <i className="fas fa-user-circle" />
                            <h3 style={{color: '#F3EFE3'}}>إدارة الحسابات</h3>
                          </div>
                          <div className="icon-text">
                            <h3>إدارة الحسابات</h3>
                            <p>تمكنك من اضافة او حذف مستفيد</p>
                            <div className="cta">
                              <a title="اضغط هنا للذهاب لإدارة الحسابات" href="/#"><i className="fa fa-arrow-right" aria-hidden="true" />&nbsp;</a>
                            </div>
                          </div>
                        </div>
						</Link>
                      </div>
                      <div onClick={() => console.log('Div clicked')} className="col-xs-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
					  <Link to="/mycustody">

                        <div style={{textAlign: 'center', width: '51rem'}} className="each-icon box-2">
                          <div className="icon-wrap">
                            <i className="fas fa-cubes" />
                            <h3 style={{color: '#F3EFE3'}}>العُهد الخاصة بي</h3>
                          </div>
                          <div className="icon-text">
                            <h3>العُهد الخاصة بي</h3>
                            <p>تمكنك من عرض العٌهد الخاصة بك</p>
                            <div className="cta">
                              <a title="اضغط هنا للذهاب للعٌهد الخاصة بك" href="/#"><i className="fa fa-arrow-right" aria-hidden="true" />&nbsp;</a>
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
      </div>
		)
	}
}
