import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import SearchByAuthor from '../SearchByAuthor';
import ContextObject from '../ContextObject';
import { MemoryRouter } from 'react-router-dom';

describe('SearchByAuthor Component', () => {
    test('check button class', () => {
        // Create default values for context
        const defaultContextValue = {
            author: [],
            setAuthor: vi.fn(), // mock function provided by vitest
            authToken: ''
        };

        render(
            <MemoryRouter>
                <ContextObject.Provider value={defaultContextValue}>
                    <SearchByAuthor />
                </ContextObject.Provider>
            </MemoryRouter>
        );

        const button = screen.getByRole('button');
        expect(button).toHaveClass('btn btn-light');
    });
});
