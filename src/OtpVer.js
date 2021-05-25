import React, { Component } from 'react';
import { Form, Input, Button, Icon, Container, Message, Transition } from 'semantic-ui-react'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'


class OtpVer extends Component {
    state = {
        errorr: true,
        otp: null,
        loggedIn: false,
        visOne: true,
        visTwo: false,
    }

    handleClick = (e) => {
        var butt = document.getElementById('otp-button');
        butt.style.display = "none";
        var inp = document.getElementById('otp-input');
        inp.style.display = "block";
    }


    handleInput = (e) => {
        // console.log(e);
        this.setState({
            otp: e.target.value
        }
            // ,()=>{
            //     console.log(this.state);
            // }
        )
    }

    handleSubmit = () => {
        var { otp } = this.state;
        if (otp !== '0000') {
            this.setState({
                errorr: false
            })
        }
        else {
            this.setState({
                errorr: true,
                loggedIn: true,
                visOne: false,
            }, () => {
                this.setState({
                    visTwo: true
                })
            })
        }
    }
    render() {
        const { errorr, loggedIn, visOne, visTwo } = this.state

        return (
            <div><Router>
                <Transition.Group animation="fly right" duration="500">
                    {visOne && (
                        <Container id="cont">

                            <Form id="myForm">
                                <Form.Group widths='equal'>
                                    <Form.Field
                                        label="Enter your mobile number"
                                        required
                                        type="number"
                                        pattern="[0-9]{10}"
                                        placeholder='Mobile Number'
                                        control={Input}
                                    />
                                </Form.Group>
                                <Button as={Link} color='twitter' animated='fade' width={8} fluid id="otp-button" style={{ display: "block" }} onClick={this.handleClick}>
                                    <Button.Content visible>
                                        <Icon name='arrow right'>
                                        </Icon>
                                    </Button.Content>
                                    <Button.Content hidden>
                                        Get OTP
                        </Button.Content>
                                </Button>
                                <div id="otp-input" style={{ display: "none" }}>
                                    <Form.Group widths='equal'>
                                        <Form.Field
                                            label="Enter OTP"
                                            placeholder='Enter OTP'
                                            type="text"
                                            pattern="[0-9]{4}"
                                            control={Input}
                                            // onInput={handleInput()}
                                        // value
                                        />
                                    </Form.Group>
                                    <Message inverted negative size='tiny' hidden={errorr}
                                        content="Incorrect OTP, Please check and try again"
                                    />
                                    <Button positive fluid type='submit' onClick={this.handleSubmit}>
                                        Sign Up
                                    </Button>
                                    <div style={{ textAlign: 'right' }}>
                                        <br />
                                        <Link>Resend OTP</Link>
                                        <br />
                                        <Link>Change mobile number</Link>
                                    </div>
                                </div>
                            </Form>

                        </Container>)}
                </Transition.Group>
                <Transition.Group animation="fly left" duration="500">
                    {visTwo && (
                        <Container fluid id="cont" >
                            <h2>Hello there,</h2>
                            <Form >
                                <Form.Group>
                                    <Form.Field
                                        label="Enter your name"
                                        required
                                        type="text"
                                        pattern="[A-Za-z]"
                                        placeholder='Your Name'
                                        control={Input}
                                    // width={16}
                                    />
                                </Form.Group>
                                <Button color='twitter' animated='fade' width={8} fluid>
                                    <Button.Content visible>
                                        <Icon name='arrow right'>
                                        </Icon>
                                    </Button.Content>
                                    <Button.Content hidden>
                                        Finish
                                    </Button.Content>
                                </Button>

                            </Form>
                        </Container>
                    )}
                </Transition.Group>
                
            </Router>
            </div>
        );
    }
}

export default OtpVer;

// https://spread.epub.pub/epub/606018ea118a7848009f45c0