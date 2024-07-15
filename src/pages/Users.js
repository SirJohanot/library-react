import React, { useCallback, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import LoadingBars from '../components/ui/LoadingBars';
import PaginationBar from '../components/ui/PaginationBar';
import SearchField from '../components/ui/SearchField';

const GET_USERS_METHOD = 'get';
const GET_USERS_URL = '/users';

export default function Users() {
    const intl = useIntl();

    const [users, setUsers] = useState();
    const [searchedUsers, setSearchedUsers] = useState([]);
    const [displayedUsers, setDisplayedUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.request({
                method: GET_USERS_METHOD,
                url: GET_USERS_URL
            });
            setUsers([...response?.data].sort((a, b) => a?.enabled ? 1 : -1));
        }
        fetchUsers();
        document.title = `${intl.formatMessage({ id: 'users' })} | ${intl.formatMessage({ id: 'appName' })}`;
    }, [intl]);

    const userFitsSearch = useCallback((user, line) => {
        const lowercaseLine = line.toLowerCase();
        const lowercaseLineKeywords = lowercaseLine.split(' ');
        return lowercaseLineKeywords.every(keyword =>
            user.login.toLowerCase().includes(keyword)
            || user.firstName.toLowerCase().includes(keyword)
            || user.lastName.toLowerCase().includes(keyword)
            || user.role.toLowerCase().includes(keyword)
        );
    }, []);

    return (
        <>
            {users ?
                <>
                    <SearchField items={users} setSearchedItems={setSearchedUsers} itemFitsSearch={userFitsSearch} />
                    <div>
                        <div className="list-header">
                            <div className="important cell">
                                <span><FormattedMessage id="loginLocale" /></span>
                            </div>
                            <div className="cell">
                                <span><FormattedMessage id="firstName" /></span>
                            </div>
                            <div className="cell">
                                <span><FormattedMessage id="lastName" /></span>
                            </div>
                            <div className="important cell">
                                <span><FormattedMessage id="role" /></span>
                            </div>
                            <div className="important cell">
                                <span><FormattedMessage id="active" /></span>
                            </div>
                        </div>
                        <div className="items-list">
                            {displayedUsers.map((user) =>
                                <div className="row" key={user.id}>
                                    <Link to={`/user/${user.login}`} className="important cell link">
                                        <span>{user?.login}</span>
                                    </Link>
                                    <div className="cell">
                                        <span>{user?.firstName}</span>
                                    </div>
                                    <div className="cell">
                                        <span>{user?.lastName}</span>
                                    </div>
                                    <div className="important cell">
                                        <span><FormattedMessage id={user?.role} /></span>
                                    </div>
                                    <div className="important cell">
                                        <span>{typeof user?.enabled !== typeof undefined && <FormattedMessage id={user?.enabled?.toString()} />}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <PaginationBar items={searchedUsers} setDisplayedItems={setDisplayedUsers} maxItemsPerPage={10} initialPage={1} />
                </>
                : <LoadingBars />
            }
        </>
    );
}
