import React from 'react';

const AddressForm = props => {
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <div>
                    <label htmlFor='street'>Street: </label>
                    <input type='text' id='street' placeholder='street' />
                </div>
                <div>
                    <label htmlFor='city'>City: </label>
                    <input type='text' id='city' placeholder='city' />
                </div>
                <div>
                    <label htmlFor='state'>State: </label>
                    <input type='text' id='state' placeholder='state' />
                </div>
                <div>
                    <label htmlFor='zipcode'>Zipcode: </label>
                    <input type='text' id='zipcode' placeholder='zipcode' />
                </div>
                <button>submit</button>
            </form>
            <a href='/test'>test</a>
        </div>
    )
}

export default AddressForm;