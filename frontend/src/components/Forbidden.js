import React, { Component } from 'react';

import PageWrapper from './ui-elements/PageWrapper';
import ContentWrapper from './ui-elements/ContentWrapper';
import Card from './ui-elements/Card';

class Forbidden extends Component {
    render() { 
        return (
            <div>
                <PageWrapper>
                    <ContentWrapper>
                        <Card padding>
                            <div style={{textAlign: "center", paddingTop: "20%", paddingBottom: "20%"}}>
                                <h1 className="text-dark display-1" style={{fontWeight: "bold"}}>Oops!</h1>
                                <h2 style={{ fontSize: "25" }}>You do not have access to this resource</h2>
                                <h3>Please check the URL and try again</h3>
                                <h4>Error code: 403</h4>
                            </div>
                        </Card>
                    </ContentWrapper>
                </PageWrapper>
            </div>
        );
    }
}
 
export default Forbidden;