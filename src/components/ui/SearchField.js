import { useEffect, useState } from "react";
import { useIntl } from "react-intl";

export default function SearchField({ items, setSearchedItems, itemFitsSearch }) {
    const intl = useIntl();

    const [searchLine, setSearchLine] = useState('');

    useEffect(() => {
        if (!searchLine) {
            setSearchedItems(items);
            return;
        }
        setSearchedItems(
            items.filter(item => itemFitsSearch(item, searchLine))
        );
    }, [searchLine, items, setSearchedItems, itemFitsSearch]);

    return (
        <input
            className="search-field"
            type="text"
            id="search"
            name="search"
            value={searchLine}
            onChange={(e) => setSearchLine(e.target.value)}
            placeholder={intl.formatMessage({ id: 'search' })}
        />
    );
}
