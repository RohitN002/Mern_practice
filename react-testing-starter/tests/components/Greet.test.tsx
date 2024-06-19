// 'iv' - for import vite :shortcut
// import { it, expect, describe } from 'vitest'

//itr shortcut to import render, screen from testing library 
// import { render, screen } from '@testing-library/react'
//render for render the testing component , screen for debug and show in the browser testing window 
import {render, screen} from '@testing-library/react'
//importing the component for testing 
import Greet from '../../src/components/Greet'
//importing library for test
// import "@testing-library/jest-dom/vitest"

//d - for create a describe function 
describe('greet', () => {
    //i - for it shortcut
it('return  hello with the name provided', () => {
    // importing the component to test 
    render(<Greet name="avs"/>) 

    const heading = screen.getByRole('heading');
    //toBeInTheDocument custom matcher in the library 
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent(/avs/i)
})

it('return  hello with the name provided', () => {
    // importing the component to test 
    render(<Greet name=""/>) 

    const button = screen.getByRole('button');
    //toBeInTheDocument custom matcher in the library 
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent(/login/i)
})
})