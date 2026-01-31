import { useState, useEffect } from 'react';
import { user } from '../pages/DataContent/Data';

interface HistoryItems {
    _id: string,
    videoid: string,
    views: string,
    watched_on: string,
    video: {
        _id: string,
        videotitle: string,
        view: number,
        createdat: string,
    }
}

const UserHistory = () => {

    const [history, sethistory] = useState<HistoryItems[]>([])
    const [loading, setloading] = useState(true)
    const AllUsers = user;

    useEffect(() => {
        if (AllUsers) {

        }
    }, [AllUsers])
    return (
        <div></div>
    )
}

export default UserHistory