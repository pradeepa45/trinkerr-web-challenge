import { Carousel, Modal } from 'react-bootstrap'
import { Button, Container, Grid } from 'semantic-ui-react'
import { useState } from 'react'

function Home(props) {
    // const imgs = [
    //     "http://getdrawings.com/get-icon#one-icon-3.png",
    //     "http://getdrawings.com/get-icon#free-shirt-icon-9.png",
    //     "http://getdrawings.com/get-icon#serial-number-icon-19.png",
    //     "http://getdrawings.com/get-icon#serial-number-icon-18.png",
    //     "http://getdrawings.com/get-icon#number-one-icon-17.png"
    // ]
    const username = localStorage.getItem("username");

    const [showOne, setShowOne] = useState(false);
    // const handleShowOne = () => setShowOne(true);
    const handleCloseOne = () => setShowOne(false);

    const [showTwo, setShowTwo] = useState(false);
    // const handleShowTwo = () => setShowOne(true);
    const handleCloseTwo = () => setShowTwo(false);

    const [last, setLast] = useState(false);
    const handleLast = () => setLast(true);
    const handleCloseLast = () => setLast(false);

    const handleDirection = (e,d) =>{
        if(d === "left"){
           setShowTwo(true);
           if(e===0){
               localStorage.setItem("One","Selected")
           }
           else if(e===1){
            localStorage.setItem("Two","Selected")
            }
            else if(e===2){
                localStorage.setItem("Three","Selected")
            }
            else if(e===3){
                localStorage.setItem("Four","Selected")
            }
            else if(e===4){
                localStorage.setItem("Five","Selected")
            }
        }
        else if(d === "right"){
            setShowOne(true);
            console.log(e);
            if(e===0){
                localStorage.setItem("One","Rejected")
            }
            else if(e===1){
             localStorage.setItem("Two","Rejected")
             }
             else if(e===2){
                 localStorage.setItem("Three","Rejected")
             }
             else if(e===3){
                 localStorage.setItem("Four","Rejected")
             }
             else if(e===4){
                 localStorage.setItem("Five","Rejected")
             }
        }
    }
    return (
        <div>

            <div>
                <Container fluid id="header-bar">
                    <h3>
                        Welcome, {username}
                        
                    </h3>

                </Container>
                <Container >
                    <Grid centered>
                        <Grid.Row>
                        
                        </Grid.Row>
                        </Grid>
                    <Modal show={showOne} onHide={handleCloseOne} >
                        <Modal.Header closeButton>
                            <Modal.Title>Hey {username},</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>You've Selected image {props.title}</Modal.Body>
                        <Modal.Footer>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={showTwo} onHide={handleCloseTwo} >
                        <Modal.Header closeButton>
                            <Modal.Title>Hey {username},</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>You've selected image {props.title}</Modal.Body>
                        <Modal.Footer>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={last} onHide={handleCloseLast} >
                        <Modal.Header closeButton>
                            <Modal.Title>Thank You</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>You've rated all images</Modal.Body>
                        <Modal.Footer>
                        </Modal.Footer>
                    </Modal>
                </Container>
            </div>
        </div>
    )
}

export default Home;