import React from 'react';
import InputGroup from './InputGroup';
import { useHistory } from 'react-router-dom';

const AddressForm = props => {
    let history = useHistory()
    return (
        <div>
            <form onSubmit={e => { e.persist(); props.handleSubmit(e, history) }}>
                <InputGroup htmlFor={'street'} labelText={'Street'} type={'text'} id={'street'} placeholder={'Street'} />
                <InputGroup htmlFor={'city'} labelText={'City'} type={'text'} id={'city'} placeholder={'City'} />
                <InputGroup htmlFor={'state'} labelText={'State'} type={'text'} id={'state'} placeholder={'State'} />
                <InputGroup htmlFor={'zipcode'} labelText={'Zipcode'} type={'text'} id={'zipcode'} placeholder={'Zipcode'} />
                <button type='submit'>submit</button>
            </form>
        </div>
    )
}

export default AddressForm;