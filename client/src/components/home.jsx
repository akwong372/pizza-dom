import React from 'react';

const Home = props => {
    console.log(props)
    return (
        <div>{props.storeID}</div>
    )
}

export default Home;