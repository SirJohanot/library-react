import { PropTypes } from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

export default function FormWrapper({ formName, formId, cancelPath, submitDisabled, submitName, children }) {

    FormWrapper.propTypes = {
        formName: PropTypes.string.isRequired,
        formId: PropTypes.string.isRequired,
        cancelPath: PropTypes.string.isRequired,
        submitDisabled: PropTypes.func.isRequired,
        submitName: PropTypes.func.isRequired,
        children: PropTypes.node.isRequired,
    };

    return (
        <div className="form-content">
            <div className="form-header">
                <h2 className="col">{formName}</h2>
                <div className="col-auto centered">
                    <Link to={cancelPath} className="btn red">
                        <FormattedMessage id="cancel" />
                    </Link>
                </div>
            </div>
            {children}
            <div className="form-actions">
                <div className="col-50">
                    <button type="submit" form={formId} className="btn" disabled={submitDisabled}>{submitName}</button>
                </div>
            </div>
        </div>
    );
}
