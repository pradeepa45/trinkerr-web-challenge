// import { Carousel, Modal } from 'react-bootstrap'
import { Button, Container, Grid } from 'semantic-ui-react'
import React,{ useState, useMemo } from 'react'
import TinderCard from 'react-tinder-card'

// ...

const db = [
    {
        name: 'One',
        url: 'http://getdrawings.com/free-icon-bw/one-icon-3.png'
    },
    {
        name: 'Two',
        url: 'http://getdrawings.com/free-icon-bw/free-shirt-icon-9.png'
    },
    {
        name: 'Three',
        url: 'http://getdrawings.com/free-icon-bw/serial-number-icon-19.png'
    },
    {
        name: 'Four',
        url: 'http://getdrawings.com/free-icon-bw/serial-number-icon-18.png'
    },
    {
        name: 'Five',
        url: 'http://getdrawings.com/free-icon-bw/number-one-icon-17.png'
    }
]

const alreadyRemoved = []
let charactersState = db

function Home(props) {
    const username = localStorage.getItem("username");

    const [characters, setCharacters] = useState(db)
    const [lastDirection, setLastDirection] = useState()

    const childRefs = useMemo(() => Array(db.length).fill(0).map(i => React.createRef()), [])

    const swiped = (direction, nameToDelete) => {
        console.log('removing: ' + nameToDelete)
        setLastDirection(direction)
        alreadyRemoved.push(nameToDelete)
    }

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
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

    var ratingDone : "block"
    return (
        <div>

            <div>
                <Container fluid id="header-bar">
                    <h3>
                        Welcome, {username}

                    </h3>

                </Container>
                <Container style={{paddingTop: "10%"}}>
                    <Grid centered>
                        <Grid.Row>
                            <div style={{display: {ratingDone}}}>
                                <div className='cardContainer'>
                                    {characters.map((character, index) =>
                                        <TinderCard ref={childRefs[index]} className='swipe' key={character.name} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character.name)}>
                                            <div style={{ backgroundImage: 'url(' + character.url + ')' }} className='card'>
                                                <h3>{character.name}</h3>
                                            </div>
                                        </TinderCard>
                                    )}
                                </div>
                                <div style={{display: 'flex'}}>
                                    <Button negative fluid onClick={() => swipe('left')}>Reject</Button>
                                    <Button positive fluid onClick={() => swipe('right')}>Select</Button>
                                </div>
                                {lastDirection ? <h2 key={lastDirection} className='infoText'>{username}, you swiped {lastDirection}</h2> : <h2 className='infoText'>Swipe a card or press a button to get started!</h2>}
                            </div>
                        </Grid.Row>
                    </Grid>

                </Container>
            </div >
        </div >
    )
}

export default Home;