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
        visThree: false,
        phonenumber: '',
        username: ''
    }

    NumberInput = (val) => {
        this.setState({
            phonenumber: val
        }
            // ,()=>{console.log(this.state);}
        )
    }

    handleClick = (e) => {
        var { phonenumber } = this.state;
        console.log(phonenumber.length);
        if (phonenumber.length < 10 && phonenumber.length > 10) {
            this.setState({
                errorr: !this.state.errorr
            })
        }
        else {
            this.setState({
                errorr: true,
                visOne: false,
            }, () => {
                this.setState({
                    visThree: true
                })
            })
        }
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
        console.log(otp);
        if (otp !== '0000') {
            this.setState({
                errorr: false
            })
        }
        else {
            this.setState({
                errorr: true,
                loggedIn: true,
                visThree: false,
            }, () => {
                this.setState({
                    visTwo: true
                })
            })
        }
    }

    ChangeNumber = (e) => {
        this.setState({
            visThree: !this.state.visThree
        }, () => {
            this.setState({
                visOne: !this.state.visOne
            })
        })
    }

    UserName = (e) =>{
        this.setState({
            username : e.target.value
        })
    }

    render() {
        const { errorr, loggedIn, visOne, visTwo, visThree, phonenumber } = this.state

        return (
            <div><Router>
                <Transition.Group animation="fly right" duration="500">
                    {visOne && (
                        <Container id="cont">
                            <Form id="myForm" >
                                <Form.Group widths='equal'>
                                    <Form.Field
                                        label="Enter your mobile number"
                                        required
                                        type="number"
                                        pattern="[0-9]{10}"
                                        placeholder='Mobile Number'
                                        control={Input}
                                        title="Only 10 Digits are to be entered"
                                        onInput={(e) => { this.NumberInput(e.target.value) }}
                                    />
                                </Form.Group>
                                <Message negative hidden={errorr}
                                    header="Error!"
                                    content="Mobile Number must contain 10 digits. Please check and try again"
                                />
                                <Button color='twitter' animated='fade' width={8} fluid id="otp-button" style={{ display: "block" }} onClick={(e) => this.handleClick(e)}>
                                    <Button.Content visible>
                                        <Icon name='arrow right'>
                                        </Icon>
                                    </Button.Content>
                                    <Button.Content hidden>
                                        Get OTP
                        </Button.Content>
                                </Button>
                            </Form>
                        </Container>)}
                </Transition.Group>
                <Transition.Group animation="fly down" duration="500">
                    {visThree && (
                        <Container fluid id="cont">
                            <Form>
                                <Form.Group widths="equal">
                                    <Form.Field
                                        label="Mobile Number"
                                        value={phonenumber}
                                        readOnly
                                        control={Input}
                                    />
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Field
                                        label="Enter OTP"
                                        placeholder='Enter OTP'
                                        type="text"
                                        pattern="[0-9]{4}"
                                        control={Input}
                                        onInput={(e) => this.handleInput(e)}
                                    />
                                </Form.Group>
                                <Message negative size='tiny' hidden={errorr}
                                    content="Incorrect OTP, Please check and try again"
                                />
                                <Button positive fluid type='submit' onClick={(e) => this.handleSubmit(e)}>
                                    Sign Up
                                    </Button>
                                <div style={{ textAlign: 'right' }}>
                                    <br />
                                    <Link>Resend OTP</Link>
                                    <br />
                                    <Link onClick={(e) => { this.ChangeNumber(e) }}>Change mobile number</Link>
                                </div>
                            </Form>
                        </Container>
                    )}
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
                                        // pattern="[A-Z][a-z]"
                                        placeholder='Your Name'
                                        control={Input}
                                        onInput = {(e)=>{this.UserName(e)}}
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