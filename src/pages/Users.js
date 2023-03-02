import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import LoadingBars from '../components/ui/LoadingBars';
import PaginationBar from '../components/ui/PaginationBar';

const GET_USERS_METHOD = 'get';
const GET_USERS_URL = '/users';

export default function Users() {
    const [users, setUsers] = useState();
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
            {users ?
                <>
                    <div>
                        <div className="list-header">
                            <div className="cell">
                                <span><FormattedMessage id="loginLocale" /></span>
                            </div>
                            <div className="cell">
                                <span><FormattedMessage id="firstName" /></span>
                            </div>
                            <div className="cell">
                                <span><FormattedMessage id="lastName" /></span>
                            </div>
                            <div className="cell">
                                <span><FormattedMessage id="role" /></span>
                            </div>
                        </div>
                        <div className="items-list">
                            {displayedUsers.map((user) =>
                                <div className="row" key={user.id}>
                                    <Link to={`/user/${user.login}`} className="cell link">
                                        <span>{user?.login}</span>
                                    </Link>
                                    <div className="cell">
                                        <span>{user?.firstName}</span>
                                    </div>
                                    <div className="cell">
                                        <span>{user?.lastName}</span>
                                    </div>
                                    <div className="cell">
                                        <span><FormattedMessage id={user?.role} /></span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <PaginationBar items={users} setDisplayedItems={setDisplayedUsers} maxItemsPerPage={10} initialPage={1} />
                </>
                : <LoadingBars />
            }
        </>
    );
}
