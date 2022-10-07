import React, { useEffect, useState } from 'react'
import { Row, Col, ListGroup, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { addCartThunk } from '../store/slices/cart.slice'

function ProductDetail() {

    const { id } = useParams()
    const dispatch = useDispatch()

    const productList = useSelector(state => state.product)
    const [quantity, setQuantity] = useState(0)

    const productDetail = productList.find(product => product.id === Number(id))
    const relatedProduct = productList.filter(
        product => product?.category.id === productDetail?.category.id
    )

    useEffect(() => {
        setQuantity(0)
    }, [id])

    const addCart = () => {
        const cart = {
            id: id,
            quantity: quantity
        }
        dispatch(addCartThunk(cart))
    }

    return (
        <Row>
            <Col>
                <h1>{productDetail?.title}</h1>
                <div >
                    <br />
                </div>
                <img className='img-fluid' src={productDetail?.productImgs?.[0]} alt="" width={'300px'} />
                <p>{productDetail?.description}</p>
                <div className="rate">
                    <Button className='me-3' onClick={() => setQuantity(quantity - 1)}>-</Button>
                    {quantity}
                    <Button className='ms-3' onClick={() => setQuantity(quantity + 1)}>+</Button>
                    <br />
                    <Button onClick={addCart}>Add to cart</Button>
                </div>
            </Col>
            <Col lg={3}>
                <ListGroup variant="flush">
                    {
                        relatedProduct.map(product => (
                            <ListGroup.Item key={product.id}>
                                <Link to={`/product/${product.id}`}>
                                    <img src={product.productImgs} alt="" className="img-fluid" />
                                    {product.title}
                                </Link>
                            </ListGroup.Item>
                        ))
                    }
                </ListGroup>
            </Col>
        </Row>

    )
}

export default ProductDetail
