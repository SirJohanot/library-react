import React, { useCallback, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import udc from '../assets/data/udc.json';
import LoadingBars from '../components/ui/LoadingBars';
import PaginationBar from '../components/ui/PaginationBar';
import SearchField from '../components/ui/SearchField';

export default function Classifiers() {
    const intl = useIntl();

    const [classifiers, setClassifiers] = useState([]);
    const [searchedClassifiers, setSearchedClassifiers] = useState([]);
    const [displayedClassifiers, setDisplayedClassifiers] = useState([]);

    useEffect(() => {
        setClassifiers(udc);
        document.title = `${intl.formatMessage({ id: 'themes' })} | ${intl.formatMessage({ id: 'appName' })}`;
    }, [intl]);

    const classifierFitsSearch = useCallback((classifier, line) => {
        const lowercaseLine = line.toLowerCase();
        const lowercaseLineKeywords = lowercaseLine.split(' ');
        return lowercaseLineKeywords.every(keyword =>
            classifier.code.includes(keyword)
            || classifier.description.toLowerCase().includes(keyword)
        );
    }, []);

    return (
        <>
            {classifiers ?
                <>
                    <SearchField items={classifiers} setSearchedItems={setSearchedClassifiers} itemFitsSearch={classifierFitsSearch} />
                    <div>
                        <div className="list-header">
                            <div className="important cell">
                                <span><FormattedMessage id="udc" /></span>
                            </div>
                            <div className="important description cell">
                                <span><FormattedMessage id="description" /></span>
                            </div>
                        </div>
                        <div className="items-list">
                            {displayedClassifiers.map((classifier) =>
                                <div className="row" key={classifier.code}>
                                    <div className="important cell">
                                        <span>{classifier?.code}</span>
                                    </div>
                                    <Link to={`/classifier/${classifier.code}`} className="important description cell link">
                                        <span>{classifier?.description}</span>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                    <PaginationBar items={searchedClassifiers} setDisplayedItems={setDisplayedClassifiers} maxItemsPerPage={10} initialPage={1} />
                </>
                : <LoadingBars />
            }
        </>
    );
}
