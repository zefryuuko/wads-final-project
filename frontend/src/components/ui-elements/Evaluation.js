import React, { Component } from 'react';

import Table from '../ui-elements/Table';

class Textbooks extends Component {
    render() { 
        return (
            <div>
                {this.props.loData && this.props.data.length > 0 ?    // New rendering method
                    <div>
                        <div className="card-title">Evaluations<span className="float-right" style={{fontWeight: "initial"}}>{this.props.right ? this.props.right : null}</span></div>
                        <Table header={Array.prototype.concat(["Component"], this.props.loData.length > 0 ? this.props.loData.map((element, index) => {
                            return `LO${index + 1}`
                        }) : [])}>
                            {this.props.data.map((element, index) => {
                                return <tr key={index}>
                                    <th scope="row">{element.name} ({element.weight}%)</th>
                                    {this.props.loData.map((lo, loId) => {
                                        return <td key={loId}>
                                            {element.evaluatedLearningOutcomes[loId] !== undefined ? element.evaluatedLearningOutcomes[loId] ? <span><i className="icon-check"/></span> : <span>-</span> : <span>-</span>}
                                        </td>
                                    })}
                                </tr>
                            })}
                        </Table>
                    </div>
                :                                           // Legacy rendering
                    <div>
                        <div className="card-title">Evaluations<span className="float-right" style={{fontWeight: "initial"}}>{this.props.right ? this.props.right : null}</span></div>
                        {this.props.data && (this.props.data.length > 0) ?
                        <Table header={Array.prototype.concat(["Component"], this.props.data[0].evaluatedLearningOutcomes.map((element, index) => {
                            return `LO${index + 1}`
                        }))}>
                            {this.props.data.map((element, index) => {
                                return <tr key={index}>
                                    <th scope="row">{element.name} ({element.weight}%)</th>
                                    {element.evaluatedLearningOutcomes.map((isEvaluated, index) => {
                                        return <td key={index}>{isEvaluated ? <span><i className="icon-check"/></span> : <span>-</span>}</td>
                                    })}
                                </tr>
                            })}
                        </Table>
                        : <div style={{textAlign: "center"}}>No evaluation</div>}
                    </div>
                }
            </div>
        );
    }
}
 
export default Textbooks;