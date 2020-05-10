import React, { Component } from 'react';

// CSS
import './LearningOutcomes.css';

// UI Elements
import Card from './Card';

class LearningOutcomes extends Component {
    render() { 
        return (
            <Card title="Learning Outcomes" right={this.props.right ? this.props.right : null} padding>
                {this.props.data && (this.props.data.length > 0) ?
                    <ol className="lo-ol">
                        {this.props.data.map((outcome, index) => {
                            return <li className="lo" key={index} style={this.olStyle}>{outcome}</li>
                        })}
                    </ol>
                : <div style={{textAlign: "center"}}>No description</div>
                }
            </Card>
        );
    }
}
 
export default LearningOutcomes;