import React from 'react';
import InputGroup from './InputGroup';
import { useHistory } from 'react-router-dom';

const Home = props => {
    let history = useHistory();
    console.log(history)
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <InputGroup htmlFor={'firstName'} labelText={'First Name'} type={'text'} id={'firstName'} placeholder={'First Name'} />
                <InputGroup htmlFor={'lastName'} labelText={'Last Name'} type={'text'} id={'lastName'} placeholder={'Last Name'} />
                <InputGroup htmlFor={'phone'} labelText={'Phone #'} type={'text'} id={'phone'} placeholder={'Phone #'} />
                <InputGroup htmlFor={'email'} labelText={'Email'} type={'email'} id={'email'} placeholder={'Email'} />
                <button type='submit'>submit</button>
            </form>
        </div>
    )
}

export default Home;