import React from 'react';
import InputGroup from './InputGroup';
import { useHistory } from 'react-router-dom';

const PaymentForm = props => {
    let history = useHistory();

    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const monthsExp = months.map((month, i) => {
        return <option key={'expireMonth' + i} value={month}>{month}</option>
    });
    const year = new Date().getFullYear();
    const years = [];
    for (var i = 0; i < 8; i++) {
        years.push(year + i);
    }
    const yearsExp = years.map((year, i) => {
        return <option key={'expireyear' + i} value={year}>{year}</option>
    })

    return (
        <div className="form-inputs">
            <form onSubmit={e => { e.persist(); props.handleSubmit(e, history) }}>
                <InputGroup htmlFor={'cardNumber'} labelText={'Card Number'} type={'text'} id={'cardNumber'} placeholder={'Card Number'} />
                <InputGroup htmlFor={'cvv'} labelText={'CVV'} type={'text'} id={'cvv'} placeholder={'CVV'} />
                <InputGroup htmlFor={'billingZip'} labelText={'Zipcode'} type={'text'} id={'billingZip'} placeholder={'Billing Zipcode'} />
                <div id={'expireSelect'}>
                    <div id={'monthSelectGroup'}>
                        <label htmlFor={'monthSelect'}>Expiration Month:</label>
                        <select id={'monthSelect'}>
                            {monthsExp}
                        </select>
                    </div>
                    <div id={'yearSelectGroup'}>
                        <label htmlFor={'yearSelect'}>Expiration Year:</label>
                        <select id={'yearSelect'}>
                            {yearsExp}
                        </select>
                    </div>
                </div>
                <button type='submit'>submit</button>
            </form>
        </div>
    )
}

export default PaymentForm;