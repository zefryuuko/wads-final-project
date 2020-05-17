import React, { Component } from 'react';

class Textbooks extends Component {
    render() { 
        return (
            <div>
                <div className="card-title">Textbooks<span className="float-right" style={{fontWeight: "initial"}}>{this.props.right ? this.props.right : null}</span></div>
                    {this.props.data && (this.props.data.length > 0) ?
                    <ol>
                        {this.props.data.map((element, index) => {
                            return <li key={index}>
                                {element.author ? `${element.author}. ` : ""} 
                                {element.year ? `(${element.year}). ` : element.author ? "(-). " : ""}
                                {element.title ? <span style={{fontWeight: "bold"}}>{element.title}<span>.&nbsp;</span></span> : ""}
                                {!element.author ? "(-). " : ""}
                                {element.publisher ? `${element.publisher}. ` : ""}
                                {element.location ? `${element.location}. ` : ""}
                                {element.isbn ? `ISBN:${element.isbn}. ` : ""}
                            </li>
                        })}
                    </ol>
                    : <div style={{textAlign: "center"}}>No textbooks</div>}
            </div>
        );
    }
}
 
export default Textbooks;