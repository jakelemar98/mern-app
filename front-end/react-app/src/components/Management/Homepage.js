import React from 'react'
import Nav from '../Utils/Nav';
import TeamInfo from './teams/TeamInfo'

export default function Homepage(props) {

    return (
        <div>
            <Nav menuName="User Dashboard" history={props.history} selected={[false, true]}/>
            <TeamInfo />
        </div>
    )
}
