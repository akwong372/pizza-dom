import React from 'react';
import { useHistory } from 'react-router-dom';

const About = props => {
    let history = useHistory();
    return (
        <div className="about-text">
            <p>Specifically craving a single order of a large Dominos Philly cheese steak pizza?</p>
            <p>Enter your info and your delivery order will be automatically be created at your nearest Dominos store.</p>
            <p>Includes a coupon too.</p>
            <button onClick={() => props.handleClick(history)}>Back</button>
        </div>
    )
};

export default About;