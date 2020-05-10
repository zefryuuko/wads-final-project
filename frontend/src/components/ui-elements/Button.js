import React, { Component } from 'react';

class Button extends Component {
    render() {
        const {tag, loading, children, disabled, ...props} = this.props;
        const spinner = <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        return tag === "a" ? <a {...props} disabled={disabled ? disabled : loading ? loading : false}>{loading ? spinner : null}{children}</a>
        :tag === "div" ? <div {...props} disabled={disabled ? disabled : loading ? loading : false}>{loading ? spinner : null}{children}</div>
        :<button {...props} disabled={disabled ? disabled : loading ? loading : false}>{loading ? spinner : null}{children}</button>
    }
}
 
export default Button;