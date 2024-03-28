import { render, screen } from '@testing-library/react';
import React from 'react';
import FormWrapper from '../FormWrapper.js';

jest.mock('react-router-dom', () => ({
    Link: (props) => <a href={props.to}>Cancel</a>
}));

describe('FormWrapper', () => {
    it('renders the form wrapper with form name, cancel link, and submit button', () => {
        const mockFormName = 'Add a Book';
        const mockFormId = 'book-form';
        const mockCancelPath = '/books';
        const mockSubmitDisabled = false;
        const mockSubmitName = 'Submit';

        render(
            <FormWrapper
                formName={mockFormName}
                formId={mockFormId}
                cancelPath={mockCancelPath}
                submitDisabled={mockSubmitDisabled}
                submitName={mockSubmitName}
            >
                <div data-testid="child-component">Child Component</div>
            </FormWrapper>
        );

        const formNameElement = screen.getByText(mockFormName);
        expect(formNameElement).toBeInTheDocument();

        const cancelLink = screen.getByText('Cancel');
        expect(cancelLink).toBeInTheDocument();
        expect(cancelLink).toHaveAttribute('href', mockCancelPath);

        const submitButton = screen.getByRole('button', { name: mockSubmitName });
        expect(submitButton).toBeInTheDocument();
        expect(submitButton).toHaveAttribute('type', 'submit');
        expect(submitButton).toHaveAttribute('form', mockFormId);
        expect(submitButton).not.toBeDisabled();

        const childComponent = screen.getByTestId('child-component');
        expect(childComponent).toBeInTheDocument();
    });

    it('disables submit button when submitDisabled prop is true', () => {
        const mockFormName = 'Add a Book';
        const mockFormId = 'book-form';
        const mockCancelPath = '/books';
        const mockSubmitDisabled = true;
        const mockSubmitName = 'Submit';

        render(
            <FormWrapper
                formName={mockFormName}
                formId={mockFormId}
                cancelPath={mockCancelPath}
                submitDisabled={mockSubmitDisabled}
                submitName={mockSubmitName}
            >
                <div data-testid="child-component">Child Component</div>
            </FormWrapper>
        );

        const submitButton = screen.getByRole('button', { name: mockSubmitName });
        expect(submitButton).toBeDisabled();
    });

});