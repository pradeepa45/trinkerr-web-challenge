import { Button, Container, Grid, Table, Transition, Header, Menu, Icon } from 'semantic-ui-react'
import React, { useState, useMemo, useEffect } from 'react'
import TinderCard from 'react-tinder-card';
import { withRouter } from 'react-router-dom';


const db = [
    {
        name: 'Five',
        url: 'http://getdrawings.com/free-icon-bw/number-one-icon-17.png',
        color: '#9789BE'
    },
    {
        name: 'Four',
        url: 'http://getdrawings.com/free-icon-bw/serial-number-icon-18.png',
        color: '#AC8BB8'
    },
    {
        name: 'Three',
        url: 'http://getdrawings.com/free-icon-bw/serial-number-icon-19.png',
        color: '89BDE1'
    },
    {
        name: 'Two',
        url: 'http://getdrawings.com/free-icon-bw/free-shirt-icon-9.png',
        color: '#7155AC'
    },
    {
        name: 'One',
        url: 'http://getdrawings.com/free-icon-bw/one-icon-3.png',
        color: '#604D93'
    }
]

const alreadyRemoved = []
let charactersState = db
var removed = []

if (localStorage.length === 8) {
    removed = ["One", "Two", "Three", "Four", "Five"]
}


function Home() {
    const username = localStorage.getItem("username");
    const [characters, setCharacters] = useState(db)
    const [lastDirection, setLastDirection] = useState()
    const [currentName, setName] = useState();
    const [rating, setRating] = useState(true);
    const [final, setFinal] = useState(false);

    useEffect(() => {
        if (alreadyRemoved.length === db.length || localStorage.length === 8) {
            setRating(false);
            setFinal(true);
        }
    }, [])

    

    useEffect(() => {
        if (removed.length === 5) {
            setRating(false);
            setFinal(true);
        }
        const handleArrowKeys = (keys) =>{
            if(keys === 'ArrowRight'){
                swipe('right');
            }
            else if(keys === 'ArrowLeft'){
                swipe('left');
            }
        }
        window.addEventListener('keydown',event=>{handleArrowKeys(event.key)})
        console.log("use effect in use")
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

    const handleLogout = () => {
        localStorage.clear();
        window.history.go(0)
    }

    return (
        <div>
            <div>
                <Menu id="header-bar">
                    <h3>
                        Welcome, {username}
                    </h3>
                </Menu>
                <Container textAlign='center'>
                    <Transition.Group animation="scale" duration="500">
                        <Grid centered verticalAlign='middle'>
                            {rating && (
                                <React.Fragment>
                                    <Grid.Row>
                                            {lastDirection ?
                                                <Container className="infoText">
                                                    <h3>Hey {username}, you have {(lastDirection === 'right' ? "selected" : "rejected")} image {currentName}
                                                    </h3>
                                                </Container>
                                                :
                                                <Container>
                                                    <h2 className='infoText'>Swipe a card or press a button to get started!</h2>
                                                </Container>}
                                    </Grid.Row>
                                    <Grid.Row>
                                            <div className='cardContainer'>
                                                {characters.map((character, index) =>
                                                    <TinderCard
                                                        ref={childRefs[index]}
                                                        className='swipe'
                                                        key={character.name}
                                                        onSwipe={(dir) => swiped(dir, character.name)}
                                                        onCardLeftScreen={() => outOfFrame(character.name)}
                                                        preventSwipe={["up", "down"]}>
                                                        <div style={{ backgroundColor: character.color }}>
                                                            <div style={{ backgroundImage: 'url(' + character.url + ')' }} className='card'>
                                                                {/* <h3>{character.name}</h3> */}
                                                            </div>
                                                        </div>
                                                    </TinderCard>
                                                )}
                                            </div>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column >
                                            <Button circular size='small' inverted color='red' onClick={() => swipe('left')}>
                                                <Icon className='angle left' fitted></Icon>
                                            </Button>
                                        </Grid.Column>
                                        <Grid.Column >
                                            <Button circular size='small' inverted color='green' onClick={() => swipe('right')}>
                                                <Icon className='angle right' fitted></Icon>
                                            </Button>
                                        </Grid.Column>
                                    </Grid.Row>

                                </React.Fragment>
                            )}
                        </Grid>
                    </Transition.Group>
                    <Transition.Group animation="zoom" duration="500">
                        {final && (
                            <Container>
                                <Grid centered verticalAlign='middle' style={{padding: '100px'}}>
                                    <Grid.Row>
                                        <Grid.Column>
                                            <Header style={{textAlign : "center"}} inverted>
                                                <Header.Content>
                                                    Thank you {username}, You have rated all the Images
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
                                                        <Table.Row
                                                            key={el}
                                                            negative={(localStorage.getItem(el) === 'left' ? true : false)}
                                                            positive={(localStorage.getItem(el) === 'right' ? true : false)}
                                                        >
                                                            <Table.Cell>{el}</Table.Cell>
                                                            <Table.Cell>{localStorage.getItem(el) === 'left' ? "rejected" : "selected"}</Table.Cell>
                                                        </Table.Row>
                                                    )} </Table.Body>
                                            </Table>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Button onClick={handleLogout}>Log Out</Button>
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