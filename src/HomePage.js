import {Header} from 'semantic-ui-react'

function Home(props){
    return(
        <div>
            <Header>
                Welcome, {props.name}
            </Header>
        </div>
    )
}

export default Home;