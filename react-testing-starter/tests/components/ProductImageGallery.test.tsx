import { render, screen } from '@testing-library/react'
import ProductImageGallery from '../../src/components/ProductImageGallery'
describe('product image gallery ', () => {

    it('should return nothing if an empty array', () => {
        const {container} = render(<ProductImageGallery imageUrls={[]}/>)
        expect (container).toBeEmptyDOMElement()
    })
    it('should reder a list of images', () => {
        const imageUrls = ['url1','url2']
        render(<ProductImageGallery imageUrls={imageUrls}/>)
        const images = screen.getAllByRole('img')
        expect(images).toHaveLength(2)
        expect(images[0]).toHaveAttribute('src',imageUrls[0])
        imageUrls.forEach((url,index)=>{
            expect(images[index]).toHaveAttribute('src',url)
        })
    })
})

