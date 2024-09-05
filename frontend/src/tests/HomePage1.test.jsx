import { render, screen, fireEvent } from '@testing-library/react'
import HomePage1 from '../HomePage1'
import ContextObject from '../ContextObject'
import {MemoryRouter} from 'react-router-dom'

test('test title', () => {
    render(
        
        <MemoryRouter>
            <HomePage1 />
        </MemoryRouter>
        
    )
    const title = screen.getByText('Glorious Books')
    console.log(title)
    expect(title).toBeInTheDocument()

    const role = screen.getByRole('link', {name: 'Subject'})
    console.log(role)
    expect(role).toHaveAttribute('id', 'link')
})

test('test link to author', () => {
    render(
        <MemoryRouter>
            <HomePage1 />
        </MemoryRouter>
    )
    const link = screen.getByRole('link', {name: 'Author'})
    console.log(link)
    expect(link).toHaveAttribute('href', '/author')
})

test('element contains other element', () => {
    render(
        <MemoryRouter>
            <HomePage1 />
        </MemoryRouter>
    )
    const  linkSubject = screen.getByRole('link', {name: 'Subject'})
    const headingtwo = screen.getByText('Subject')
    expect(linkSubject).toContainElement(headingtwo)
    
})
describe('text styles', () =>{
    test('test whether hr has correct style', () => {
        render(
            <MemoryRouter>
                <HomePage1 />
            </MemoryRouter>
        )
        const hr = screen.getByRole('separator')
        expect(hr).toHaveStyle('height: 10px')
    })
    
    
    test('test whether bottom h1 has correct style', () => {
        render(
            <MemoryRouter>
                <HomePage1 />
            </MemoryRouter>
        )
        const bottomH1 = screen.getByText('To view', {exact: false})
        expect(bottomH1).toHaveStyle('color: rgb(255, 255, 255)')
    })
})


test('test div className', () => {
    render(

        <MemoryRouter>
            <HomePage1 />
        </MemoryRouter>
    )
    const div = screen.getByText('Glorious Books')
    expect(div).toHaveClass('display-1')
})

test('click on <Link>', () => {
    render(
        <MemoryRouter>
            <HomePage1 />
        </MemoryRouter>
    )
    const link = screen.getByRole('link', {name: 'Subject'})
    fireEvent.click(link)
    expect(link).toHaveAttribute('href', '/subject')
})