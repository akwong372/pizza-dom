import React from 'react';

const ConfirmOrder = props => {
    return (
        <div className="form-inputs">
            <ul className="result-list">
                <li>food total: {Number(props.foodTotal) + Number(props.savings)}</li>
                <li>tax: {props.tax}</li>
                <li>delivery fee: {props.delivery}</li>
                <li>savings: -{props.savings}</li>
                <hr/>
                <li>total: {props.total}</li>
            </ul>
            <div></div>
            <button onClick={props.handleSubmit}>Order it</button>
        </div>
    );
};

export default ConfirmOrder;