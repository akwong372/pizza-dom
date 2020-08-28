import React from 'react';

const InputGroup = props => {
    return (
        <div>
            <label htmlFor={props.htmlFor}>{props.labelText}: </label>
            <input type={props.type} id={props.id} placeholder={props.placeholder} />
        </div>
    );
};

export default InputGroup;