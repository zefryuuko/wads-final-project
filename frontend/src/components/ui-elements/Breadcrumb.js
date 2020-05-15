import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Breadcrumb extends Component {
    render() { 
        return (
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb m-0 p-0">
                    {
                        this.props.contents ? 
                            this.props.contents.map((element, index) => {
                                return (
                                    <li className="breadcrumb-item" key={index}>
                                        {element.url ? <Link to={element.url} className="text-muted">{element.name}</Link> : element.name} 
                                    </li>
                                );
                            })
                        : <span></span>
                    }
                    <li className="breadcrumb-item text-muted active" aria-current="page">{this.props.current}</li>
                </ol>
            </nav>
        );
    }
}
 
export default Breadcrumb;