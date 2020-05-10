import React, { Component } from 'react';

class Card extends Component {
    render() { 
        return (
            <div className="card">
                {this.props.padding ? 
                    <div className="card-body">
                        {this.props.title ? <div className="card-title">{this.props.title}</div> : null}
                        {this.props.children}
                    </div> :
                    <div>
                        {this.props.title ? <div className="card-title">{this.props.title}</div> : null}
                        {this.props.children}
                    </div>
                }
            </div>
        );
    }
}
 
export default Card;