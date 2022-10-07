import React, { useEffect } from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getPurchasesThunk } from '../store/slices/purchases.slices'

function Purchases() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const purchases = useSelector(state => state.purchases)

    useEffect(() => {
        dispatch(getPurchasesThunk())
    }, [])

    return (
        <div>
            <h1>Purchases</h1>
            <ListGroup>
                {
                    purchases.map(purchase => (
                        <ListGroup.Item key={purchase.id}>
                            {

                                purchase.cart.products.map(item => (
                                    <Card key={item.id} onClick={() => navigate(`/product/${item.id}`)}>
                                        <Card.Body>
                                            <p>{item.title}</p>
                                            <p>${item.price}</p>
                                        </Card.Body>
                                    </Card>
                                ))
                            }
                            <br />
                        </ListGroup.Item>
                    ))
                }
            </ListGroup>
        </div>
    )
}

export default Purchases