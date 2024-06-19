import { render, screen } from '@testing-library/react'
import { User } from '../../src/entities'
import UserAccount from '../../src/components/UserAccount'
// import User from '../../src/entities'
describe('group', () => {
    it('should', () => {
        const user : User = {id:1, name:"rohi"}
        render(<UserAccount user={user}/>)

        expect(screen.getByText(user.name)).toBeInTheDocument()
    })
})