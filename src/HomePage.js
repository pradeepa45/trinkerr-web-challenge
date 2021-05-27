import { Button, Container, Grid, Table, Transition, Header } from 'semantic-ui-react'
import React, { useState, useMemo, useEffect } from 'react'
import TinderCard from 'react-tinder-card'
import { withRouter} from 'react-router-dom'

const db = [
    {
        name: 'Five',
        url: 'http://getdrawings.com/free-icon-bw/number-one-icon-17.png'
    },
    {
        name: 'Four',
        url: 'http://getdrawings.com/free-icon-bw/serial-number-icon-18.png'
    },
    {
        name: 'Three',
        url: 'http://getdrawings.com/free-icon-bw/serial-number-icon-19.png'
    },
    {
        name: 'Two',
        url: 'http://getdrawings.com/free-icon-bw/free-shirt-icon-9.png'
    },
    {
        name: 'One',
        url: 'http://getdrawings.com/free-icon-bw/one-icon-3.png'
    }
]

const alreadyRemoved = []
let charactersState = db
var removed = []

if (localStorage.key("Five")) {
    removed = ["One", "Two", "Three", "Four", "Five"]
}


function Home() {
    const username = localStorage.getItem("username");
    const [characters, setCharacters] = useState(db)
    const [lastDirection, setLastDirection] = useState()
    const [currentName, setName] = useState();
    const [rating, setRating] = useState(true);
    const [final, setFinal] = useState(false);

    useEffect(()=>{
        if (alreadyRemoved.length === db.length || localStorage.length === 8) {
            setRating(false);
            setFinal(true);
        }
    },[])

    useEffect(()=>{
        if(removed.length === 5){
            setRating(false);
            setFinal(true);
        }
    })

    const childRefs = useMemo(() => Array(db.length).fill(0).map(i => React.createRef()), [])

    const swiped = (direction, nameToDelete) => {
        console.log('removing: ' + nameToDelete)
        setLastDirection(direction)
        localStorage.setItem(nameToDelete, direction);
        setName(nameToDelete);
        removed.push(nameToDelete);
        alreadyRemoved.push(nameToDelete);
        
    }

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!');
        charactersState = charactersState.filter(character => character.name !== name)
        setCharacters(charactersState)
    }

    const swipe = (dir) => {
        const cardsLeft = characters.filter(person => !alreadyRemoved.includes(person.name))
        if (cardsLeft.length) {
            const toBeRemoved = cardsLeft[cardsLeft.length - 1].name // Find the card object to be removed
            const index = db.map(person => person.name).indexOf(toBeRemoved) // Find the index of which to make the reference to
            alreadyRemoved.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
            childRefs[index].current.swipe(dir) // Swipe the card!
        }
    }

    const handleLogout = () =>{
        localStorage.clear();
        window.history.go(0)
    }   

    return (
        <div>
            <div>
                <Container fluid id="header-bar">
                    <h3>
                        Welcome, {username}
                    </h3>
                </Container>
                <Container>
                    <Transition.Group animation="scale" duration="500">
                        <Grid centered stackable>
                            {rating && (
                                <Container>
                                    <Grid.Row>
                                        <Grid.Column>
                                            <div className='cardContainer'>
                                                {characters.map((character, index) =>
                                                    <TinderCard ref={childRefs[index]} className='swipe' key={character.name} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character.name)} preventSwipe={["up", "down"]}>
                                                        <div style={{ backgroundImage: 'url(' + character.url + ')' }} className='card'>
                                                            <h3>{character.name}</h3>
                                                        </div>
                                                    </TinderCard>
                                                )}
                                            </div>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column ><Button negative onClick={() => swipe('left')}>Reject</Button></Grid.Column>
                                        <Grid.Column ><Button positive onClick={() => swipe('right')}>Select</Button>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column>
                                            {lastDirection ?
                                                <Container >
                                                    <h4 className='infotext'>Hey {username}</h4>
                                                    <p className='infotext'>
                                                        You have {(lastDirection === 'right' ? "selected" : "rejected")} image {currentName}
                                                    </p>
                                                </Container>
                                                :
                                                <Container>
                                                    <h2 className='infoText'>Swipe a card or press a button to get started!</h2>
                                                </Container>}
                                        </Grid.Column>
                                    </Grid.Row>
                                </Container>
                            )}
                        </Grid>
                    </Transition.Group>
                    <Transition.Group animation="scale" duration="500">
                        {final && (
                            <Container>
                                <Grid centered>
                                    <Grid.Row>
                                        <Grid.Column width={5}>
                                            <Header>
                                                <Header.Content>
                                                    {username}, You have rated all the Images
                                                </Header.Content>
                                            </Header>
                                            <Table celled>
                                                <Table.Header>
                                                    <Table.Row>
                                                        <Table.HeaderCell>Name</Table.HeaderCell>
                                                        <Table.HeaderCell>Status</Table.HeaderCell>
                                                    </Table.Row>
                                                </Table.Header>
                                                <Table.Body>
                                                    {removed.map((el) =>
                                                        <Table.Row key={el} negative={(localStorage.getItem(el) === 'left' ? true : false)}>
                                                            <Table.Cell>{el}</Table.Cell>
                                                            <Table.Cell>{localStorage.getItem(el) === 'left' ? "rejected" : "selected"}</Table.Cell>
                                                        </Table.Row>
                                                    )} </Table.Body>
                                            </Table>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Button onClick={handleLogout}>Log Out Instead</Button>
                                    </Grid.Row>
                                </Grid>
                            </Container>
                        )}
                    </Transition.Group>
                </Container>
            </div >
        </div >
    )
}

export default withRouter(Home);