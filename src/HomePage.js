import {Header} from 'semantic-ui-react'

function Home(props){
    return(
        <div>
            <Header id="header-bar">
                Welcome, {props.name}
            </Header>
        </div>
    )
}

export default Home;