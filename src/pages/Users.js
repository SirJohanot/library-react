import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import PaginationBar from '../components/ui/PaginationBar';
import UserParameters from '../components/view/UserParameters';

const GET_USERS_METHOD = 'get';
const GET_USERS_URL = '/users';

export default function Users() {
    const [users, setUsers] = useState([]);
    const [displayedUsers, setDisplayedUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.request({
                method: GET_USERS_METHOD,
                url: GET_USERS_URL
            });
            setUsers(response?.data);
        }
        fetchUsers();
    }, []);

    return (
        <>
            {displayedUsers.map((user) =>
                <Link to={`/user/${user.login}`} key={user.id}>
                    <button className="round-bordered-subject block-container">
                        <UserParameters user={user} />
                    </button>
                </Link>
            )}
            <PaginationBar items={users} setDisplayedItems={setDisplayedUsers} maxItemsPerPage={5} initialPage={1} />
        </>
    );
}
