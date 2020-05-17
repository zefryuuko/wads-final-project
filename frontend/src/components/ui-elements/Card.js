import React, { Component } from 'react';

class Card extends Component {
    render() { 
        return (
            <div className="card" style={this.props.style ? this.props.style : {}}>
                {this.props.padding ? 
                    <div className="card-body">
                        <div className="float-right">{this.props.right ? this.props.right : null}</div>
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