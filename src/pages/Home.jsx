import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, InputGroup, Form, Row, Col, ListGroup, Card } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function componentName() {

    const navigate = useNavigate()
    const productList = useSelector(state => state.product)
    const [categories, setCategories] = useState([])
    const [productFiltered, setProductFiltered] = useState([])
    const [searchVaule, setSearchValue] = useState('')

    useEffect(() => {
        axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products/categories')
            .then(res => setCategories(res.data.data.categories))
    }, [])

    useEffect(() => {
        setProductFiltered(productList)
    }, [productList])

    const filterCategory = (categoryId) => {
        const filtered = productList.filter(product =>
            product.category.id === categoryId
        )
        setProductFiltered(filtered)
    }

    const searchProduct = () => {
        const filtered = productList.filter(
            product => product.title.toLowerCase().includes(searchVaule.toLowerCase())
        )
        setProductFiltered(filtered)
    }

    return (
        <Row>
            <Col lg={3}>
                <ListGroup>
                    {
                        categories.map(category => (

                            <ListGroup.Item
                                key={category.id}
                                onClick={() => filterCategory(category.id)}
                                style={{ cursor: 'pointer' }}
                            >
                                {category.name}
                            </ListGroup.Item>
                        ))
                    }

                </ListGroup>
            </Col>
            <Col>
                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="Search product"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        onChange={e => setSearchValue(e.target.value)}
                        value={searchVaule}
                    />
                    <Button variant="outline-secondary" id="button-addon2" onClick={searchProduct}>
                        Button
                    </Button>
                </InputGroup>

                <Row xs={1} md={2} xl={3} className="g-4">
                    {productFiltered.map(product => (
                        <Col key={product.id}>
                            <Card onClick={() => navigate(`/product/${product.id}`)} style={{height:'100%'}} >
                                <Card.Img variant="top" src={product.productImgs?.[0]} />
                                <Card.Body>
                                    <Card.Title>{product.title}</Card.Title>
                                    <Card.Text>
                                        {product.description}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Col>
        </Row>
    )
}

export default componentName
