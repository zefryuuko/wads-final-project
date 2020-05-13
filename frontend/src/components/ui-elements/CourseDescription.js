import React, { Component } from 'react';

// UI Elements
import Card from './Card';

class CourseDescription extends Component {
    render() { 
        return (
            <Card title="Course Description" right={this.props.right ? this.props.right : null} padding>
                {this.props.data? <p>{this.props.data}</p>
                : <div style={{textAlign: "center"}}>No description.</div>
                }
            </Card>
        );
    }
}
 
export default CourseDescription;