import React from 'react';
import { FormattedMessage } from 'react-intl';

export default function CancelButton() {
    return (
        <button className="btn red"><FormattedMessage id="cancel" /></button>
    );
}
