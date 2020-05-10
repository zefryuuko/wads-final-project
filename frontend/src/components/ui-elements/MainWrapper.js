import React from 'react';

class MainWrapper extends React.Component {
    render() {
        return (
            <div id="main-wrapper" data-theme="light" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed" data-boxed-layout="full">
                {this.props.children}
            </div>
        );
    }
}

export default MainWrapper