import React, { Component } from 'react';

import Table from '../ui-elements/Table';

class Textbooks extends Component {
    render() { 
        return (
            <div>
                {console.log(this.props.data)}
                <div className="float-right">{this.props.right ? this.props.right : null}</div>
                <div className="card-title">Evaluations</div>
                    {this.props.data && (this.props.data.length > 0) ?
                    <Table header={Array.prototype.concat(["Component"], this.props.data[0].evaluatedLearningOutcomes.map((element, index) => {
                        return `LO${index + 1}`
                    }))}>
                        {this.props.data.map((element, index) => {
                            return <tr key={index}>
                                <th scope="row">{element.name}</th>
                                {element.evaluatedLearningOutcomes.map((isEvaluated, index) => {
                                    return <td key={index}>{isEvaluated ? <span><i className="icon-check"/></span> : <span>-</span>}</td>
                                })}
                            </tr>
                        })}
                    </Table>
                    : <div style={{textAlign: "center"}}>No evaluation</div>}
            </div>
        );
    }
}
 
export default Textbooks;