import React from 'react';
import {Card, Button, Row, Col, Form, Badge, Container, Toast} from 'react-bootstrap';

import axios from 'axios';

class QueryCards extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            response  : "You can see the last response here",
            isLoading1 : false,
            isLoading2 : false,
            url        : "",
            meta       : "",
        };
    }
    findMetaTag = async () => {
        if(this.state.url.trim()!="" && this.state.meta.trim()!=""){
            let response = "";
            this.setState({isLoading1: true, response: "..."});
            await axios.post('/apis/findMeta', {url: this.state.url, meta: this.state.meta}).then( (res)=>{
                response = res.data.message;
                console.log(response);
                console.log(res);
            });
            this.setState({isLoading1: false, response: response });
        }
        else{
            this.setState({response: "Please provide both the inputs before querying"})
        }
    }

    validURL(myURL) {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ //port
        '(\\?[;&amp;a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i');
        return pattern.test(myURL);
     }

    handleInputChange = (event) => {
        if(event.target.name=="url"){
            if(!(this.validURL(event.target.value))){
                this.setState({response: "Please provide a valid url as input", url: ""});
                return;
            }
        }
        this.setState({[event.target.name]: event.target.value});
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
                                        <Form >
                                            <Form.Group controlId="formGroupURL">
                                                <Form.Label>URL</Form.Label>
                                                <Form.Control as='input' type="url" value={this.state.url} name="url" onChange={this.handleInputChange} placeholder="Enter the url for lookup" />
                                            </Form.Group>
                                            <Form.Group controlId="formGroupMETA">
                                                <Form.Label>Meta Tag</Form.Label>
                                                <Form.Control as='input' type="text" value={this.state.meta} name="meta" onChange={this.handleInputChange} placeholder="Enter the meta tag you want to search for" />
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
                    <center>
                    <Card style={{width: '30rem'}} className="bg-success p-2">
                        <Card.Text className="h5">
                            {this.state.response}
                        </Card.Text>
                    </Card>
                    </center>
                </Container>
                );
    }
}

export default QueryCards;