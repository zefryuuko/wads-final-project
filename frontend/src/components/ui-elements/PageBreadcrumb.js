import React from 'react';

import Breadcrumb from './Breadcrumb';

class PageBreadcrumb extends React.Component {
    render() {
        return (
            <div className="page-breadcrumb">
                <div className="row">
                    <div className="col-7 align-self-center">
                        <h4 className="page-title text-truncate text-dark font-weight-medium mb-1">{this.props.title}</h4>
                        <div className="d-flex align-items-center">
                            {this.props.breadcrumb ? this.props.breadcrumb : <Breadcrumb current={this.props.title} contents={[{name: this.props.root, url: ""}]}/> }
                        </div>
                    </div>
                    <div className="col-5 align-self-center">
                        <div className="float-right">
                            {this.props.rightComponent ? this.props.rightComponent : <span></span>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PageBreadcrumb;