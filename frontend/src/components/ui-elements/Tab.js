import React, { Component } from 'react';

class Tab extends Component {
    render() { 
        return (
            <div>
                {this.props.data && (this.props.data.length > 0)?
                    // Table Navigation
                    <ul className="nav nav-tabs nav-bordered mb-3">
                        {this.props.data.map((element, index) => {
                            return (
                                <li className="nav-item" key={`tab-${element.name}-${index}`}>
                                        <a href={`#tab-${element.name}-${index}`} data-toggle="tab" aria-expanded="false" className={`nav-link ${index > 0 ? "" : "active"}`}>
                                        <i className="mdi mdi-home-variant d-lg-none d-block mr-1"></i>
                                         <span className="d-none d-lg-block">{element.name}</span>
                                    </a>
                                </li>
                            )
                        })}
                    </ul>

                    // Table Body
                : <div style={{textAlign: "center"}}>No data</div>}
            </div>
        );
    }
}
 
export default Tab;