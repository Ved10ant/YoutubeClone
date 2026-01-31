import { useState, useEffect } from 'react';
import { user } from '../pages/DataContent/Data';

interface HistoryItems{
    _id: string,
    videoid:string,
    views:string,
    watched_on
}

const UserHistory = () => {

    const [history, sethistory] = useState([])
    const [loading, setloading] = useState(true)
    const AllUsers = user;

    return (
        <div></div>
    )
}

export default UserHistory