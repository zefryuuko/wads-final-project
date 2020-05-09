import React from 'react';

class PageWrapper extends React.Component {
    render() {
        return (
            <div className="page-wrapper" style={{display: "block"}}>
                {this.props.children}
            </div>
        );
    }
}

export default PageWrapper