import React from 'react'
import { FormattedMessage } from 'react-intl'

export default function CancelButton() {
    return (
        <button className="red"><FormattedMessage id="cancel" /></button>
    )
}
