import { useState, useEffect } from 'react';
import { user } from '../pages/DataContent/Data';

interface HistoryItems

const UserHistory = () => {

    const [history, sethistory] = useState([])
    const [loading, setloading] = useState(true)
    const AllUsers = user;

    return (
        <div></div>
    )
}

export default UserHistory