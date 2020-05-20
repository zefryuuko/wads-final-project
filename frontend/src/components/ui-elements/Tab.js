import React, { Component } from 'react';

class Tab extends Component {
    render() { 
        return (
            <div>
                {this.props.data && (this.props.data.length > 0)?
                    <div>
                        {/* Table Navigation */}
                        <ul className="nav nav-tabs nav-bordered mb-3">
                            {this.props.data.map((element, index) => {
                                return (
                                    <li className="nav-item" key={`tab-${element.name.replace(/\s/g, '')}-${index}`}>
                                            <a href={`#tab-${element.name.replace(/\s/g, '')}-${index}`} data-toggle="tab" aria-expanded="false" className={`nav-link ${index > 0 ? "" : "active"}`}>
                                            <i className="mdi mdi-home-variant d-lg-none d-block mr-1"></i>
                                            <span className="d-lg-block">{element.name}</span>
                                        </a>
                                    </li>
                                )
                            })}
                        </ul>

                        {/* Table Body */}
                        <div className="tab-content">
                            {this.props.data.map((element, index) => {
                                return (
                                    <div className={`tab-pane ${index > 0 ? "" : "show active"}`} id={`tab-${element.name.replace(/\s/g, '')}-${index}`} key={`tab-${element.name}-${index}`}>
                                        {element.component ? element.component : null}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                : <div style={{textAlign: "center"}}>No data</div>}
            </div>
        );
    }
}
 
export default Tab;