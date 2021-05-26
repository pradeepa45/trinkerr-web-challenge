import React, { Component } from 'react';
import { Form, Input, Button, Icon, Container, Message, Transition, Grid } from 'semantic-ui-react'
import { BrowserRouter, Link } from 'react-router-dom'
import Name from './undraw_Detailed_information_re_qmuc.svg'
import MNumber from './undraw_Mobile_apps_re_3wjf.svg'
import Otp from './undraw_message_sent_1030.svg'
import Home from './HomePage'

class OtpVer extends Component {
    state = {
        errorr: true,
        otp: null,
        visOne: true,
        visTwo: false,
        visThree: false,
        phonenumber: '',
        username: ''
    }

    componentDidMount() {
        localStorage.clear();
        localStorage.setItem("loggedIn",false);
    }

    NumberInput = (val) => {
        this.setState({
            phonenumber: val
        }
        )
    }

    handleClick = (e) => {
        var { phonenumber } = this.state;
        console.log(phonenumber.length);
        if (phonenumber.length < 10 || phonenumber.length > 10) {
            this.setState({
                errorr: false
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
            visThree: false
        }, () => {
            this.setState({
                visOne: true
            })
        })
    }

    UserName = (e) => {
        this.setState({
            username: e.target[0].value
        }, () => {
            localStorage.setItem("loggedIn", true);
            localStorage.setItem("username", this.state.username);
            localStorage.setItem("mobilenumber", this.state.phonenumber);
        })
    }

    render() {
        const { errorr, visOne, visTwo, visThree, phonenumber } = this.state
        const loggedIn = localStorage.getItem("loggedIn");
        return (
            <div id="otp-ver">
                <header id="header-bar">
                    <h1>Pictorator</h1>
                </header>
                    <div>
                        <Transition.Group animation="scale" duration="500">
                            {loggedIn && (
                                <div>
                                    <Transition.Group animation="fly right" duration="500">
                        {visOne && (
                            <Container id="cont">
                                <Grid centered stackable columns={2}>
                                    <Grid.Row>
                                        <Grid.Column width={5}>
                                        <img src={MNumber} alt="" />
                                        </Grid.Column>
                                        <Grid.Column width={5}>
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
                                    <Button animated='fade' width={8} fluid id="otp-button" style={{ display: "block", backgroundColor: "#69A5E0" }} onClick={(e) => this.handleClick(e)}>
                                        <Button.Content visible>
                                            <Icon name='arrow right'>
                                            </Icon>
                                        </Button.Content>
                                        <Button.Content hidden>
                                            Get OTP
                        </Button.Content>
                                    </Button>
                                </Form>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>

                                
                            </Container>)}
                    </Transition.Group>
                    <Transition.Group animation="fly down" duration="500">
                        {visThree && (
                            <Container fluid id="cont">
                                <Grid centered stackable columns={2}>
                                    <Grid.Row>
                                        <Grid.Column width={5}>
                                        <img src={Otp} alt=""/>
                                        </Grid.Column>
                                        <Grid.Column width={5}>
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
                                    <Button fluid type='submit' style={{ backgroundColor: "#69A5E0" }} onClick={(e) => this.handleSubmit(e)}>
                                        Sign Up
                                    </Button>
                                    <div style={{ textAlign: 'right' }}>
                                        <br />
                                        <Link>Resend OTP</Link>
                                        <br />
                                        <Link onClick={(e) => { this.ChangeNumber(e) }}>Change mobile number</Link>
                                    </div>
                                </Form>
                                        </Grid.Column>
                                    </Grid.Row>
                               
                                </Grid>
                            </Container>
                        )}
                    </Transition.Group>
                    <Transition.Group animation="fly left" duration="500">
                        {visTwo && (
                            <Container fluid id="cont" >
                                <Grid centered stackable columns={2}>
                                    <Grid.Row>
                                        <Grid.Column width={5}>
                                        <img src={Name} alt="" />
                                        </Grid.Column>
                                        <Grid.Column width={5}>
                                        <h3>One last step...</h3>
                                <Form onSubmit={(e) => { this.UserName(e); }}>
                                    <Form.Group widths="equal">
                                        <Form.Field
                                            label="What's your name?"
                                            required
                                            type="text"
                                            // pattern="[A-Z][a-z]"
                                            placeholder='Your Name'
                                            control={Input}
                                        // onInput = {(e)=>{this.UserName(e)}}
                                        // width={16}
                                        />
                                    </Form.Group>
                                    <Button animated='fade' width={8} fluid style={{ backgroundColor: "#69A5E0" }}>
                                        <Button.Content visible>
                                            <Icon name='arrow right'>
                                            </Icon>
                                        </Button.Content>
                                        <Button.Content hidden>
                                            Finish
                                    </Button.Content>
                                    </Button>

                                </Form>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Container>
                        )}
                    </Transition.Group>
                        
                                </div>
                            )}
                        </Transition.Group>
                    </div>
                    {/* <div>
                        <Transition.Group>
                            {loggedIn && (
                                <Home name={localStorage.getItem("username")} />
                            ) }
                        </Transition.Group>
                    </div> */}
            </div>
        );
    }
}


export default OtpVer;