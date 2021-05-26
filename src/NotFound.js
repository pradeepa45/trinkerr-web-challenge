import {Component} from 'react';
import { Container, Grid, Message,Button } from 'semantic-ui-react';
import ErrorImg from './undraw_page_not_found_su7k.svg'
import {Link} from 'react-router-dom'

class NotFound extends Component{
    render(){
        return(
            <div>
                <Container style={{paddingTop:"10%"}}>
                   <Grid>
                       <Grid.Row centered stackable columns={2}>
                           <Grid.Column>
                           <img src ={ErrorImg} alt="Not Found"></img>
                           </Grid.Column>
                           <Grid.Column verticalAlign='middle' >
                               <Container>
                               <Message error>
                                   <Message.Header>Oops!</Message.Header>
                                   <Message.Content>Looks like you are lost</Message.Content>
                                   <Button inverted color='google plus' as={Link} to="/home">Go Back</Button>
                                </Message>
                               
                               </Container>
                           </Grid.Column>
                       </Grid.Row>
                   </Grid>
                </Container>
            </div>
        )
    }
}

export default NotFound;