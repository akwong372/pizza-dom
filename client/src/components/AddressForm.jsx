import React from 'react';
import {useHistory} from 'react-router-dom';

const AddressForm = props => {
    let history = useHistory()
    console.log(history)
    return (
        <div>
            <form onSubmit={e=> {e.persist(); props.handleSubmit(e, history)}}>
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
                <button type='submit'>submit</button>
            </form>
        </div>
    )
}

export default AddressForm;