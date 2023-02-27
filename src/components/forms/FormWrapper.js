import React from 'react';
import { Link } from 'react-router-dom';
import CancelButton from '../ui/CancelButton.js';

export default function FormWrapper({ formName, formId, cancelPath, submitDisabled, submitName, children }) {
    return (
        <div className="form-content">
            <div className="form-header">
                <h2 className="col">{formName}</h2>
                <div className="col-auto centered">
                    <Link to={cancelPath}>
                        <CancelButton />
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
