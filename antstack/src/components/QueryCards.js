import React from 'react';
import {Card, Button, Row, Col, Form, Badge, Container} from 'react-bootstrap';

import axios from 'axios';

class QueryCards extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            response  : "You can see the last response here",
            isLoading1 : false,
            isLoading2 : false,
        };
        this.findMetaTag = this.findMetaTag.bind(this);
    }
    async findMetaTag () {
        let response = "";
        this.setState({isLoading1: true});
        await axios.post('/apis/hello', {message: "hello"}).then( (res)=>{
            response = res.data.message;
            console.log(response);
            console.log(res);
        });
        this.setState({isLoading1: false, response: response });
    }
    render () {

        const findDNSTxt = () => {

        }
        return (
                <Container fluid>
                    <Row className="m-5">
                        <Col sm={12} md={6}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Query For Meta Tag Here</Card.Title>
                                        <Form>
                                            <Form.Group controlId="formGroupURL">
                                                <Form.Label>URL</Form.Label>
                                                <Form.Control type="url" placeholder="Enter the url for lookup" />
                                            </Form.Group>
                                            <Form.Group controlId="formGroupMETA">
                                                <Form.Label>Meta Tag</Form.Label>
                                                <Form.Control type="text" placeholder="Enter the meta tag you want to search for" />
                                            </Form.Group>
                                        </Form>
                                    <Button variant="primary" disabled={this.state.isLoading}  onClick={!this.state.isLoading1 ? this.findMetaTag : null}>{ this.state.isLoading1 ? 'Processing...': 'Find Response'}</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={12} md={6} style={{margin: "auto"}}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Query For DNS TXT Record Here</Card.Title>
                                        <Form>
                                            <Form.Group controlId="formGroupURL">
                                                <Form.Label>URL</Form.Label>
                                                <Form.Control type="url" placeholder="Enter the url for lookup" />
                                            </Form.Group>
                                            <Form.Group controlId="formGroupDNS">
                                                <Form.Label>DNS Txt Record</Form.Label>
                                                <Form.Control type="text" placeholder="Enter the dns txt record you want to search for" />
                                            </Form.Group>
                                        </Form>
                                    <Button variant="primary" disabled={this.state.isLoading2}  onClick={!this.state.isLoading2 ? findDNSTxt : null}>{ this.state.isLoading2 ? 'Processing...': 'Find Response'}</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <div className="text-center h3">
                        <Badge variant="success">{this.state.response}</Badge>
                    </div>
                </Container>
                );
    }
}

export default QueryCards;