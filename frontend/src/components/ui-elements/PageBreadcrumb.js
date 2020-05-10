import React from 'react';

import Breadcrumb from './Breadcrumb';

class PageBreadcrumb extends React.Component {
    render() {
        return (
            <div className="page-breadcrumb">
                <div className="row">
                    <div className={`${this.props.rightComponent ?"col-8" : "col-12"} align-self-center`}>
                        <h4 className="page-title text-truncate text-dark font-weight-medium mb-1" style={{textOverflow: "wrap", whiteSpace: "initial"}}>{this.props.title}</h4>
                        <div className="d-flex align-items-center">
                            {this.props.breadcrumb ? this.props.breadcrumb : <Breadcrumb current={this.props.title} contents={[{name: this.props.root, url: ""}]}/> }
                        </div>
                    </div>
                    {this.props.rightComponent ?
                        <div className="col-4 align-self-center">
                            <div className="float-right">
                                {this.props.rightComponent}
                            </div>
                        </div>
                    : <span></span>}
                </div>
            </div>
        );
    }
}

export default PageBreadcrumb;