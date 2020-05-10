import React, { Component } from 'react';

class Table extends Component {
    render() { 
        return (
            <div className="table-responsive">
                <table className="table">
                    {this.props.header ?
                        <thead className="bg-primary text-white">
                            <tr>
                                {this.props.header.map(col => {
                                    return <th key={col}>{col}</th>
                                })}
                            </tr>
                        </thead>
                    : null}
                    <tbody>
                        {this.props.children}
                    </tbody>
                </table>
            </div>
        );
    }
}
 
export default Table;