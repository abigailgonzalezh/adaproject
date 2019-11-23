import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import Account from '@material-ui/icons/AccountCircle';
import { BrowserRouter as Router, Route , Link, Redirect } from "react-router-dom";
import Container from '@material-ui/core/Container';


class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lugar: '',
      tiempo: '',
    };

    
  }

  componentWillMount() {
    const { steps } = this.props;
    const { lugar, tiempo} = steps;


    this.setState({ lugar, tiempo});
  }

  render() {
    const { lugar, tiempo} = this.state;
    
    return (
      <div style={{ width: '100%' }}>
        <h3>informacion</h3>
        <table>
          <tbody>
            <tr>
              <td>Lugar</td>
              <td>{lugar.value}</td>
            </tr>
            <tr>
              <td>Tiempo</td>
              <td>{tiempo.value}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

Review.propTypes = {
  steps: PropTypes.object,
};

Review.defaultProps = {
  steps: undefined,
};



class SimpleForm extends Component {
  
  render() {
    const theme = {
      background: '#f5f8fb',
      headerBgColor: '#a288e3',
      headerFontColor: '#fff',
      headerFontSize: '15px',
      botBubbleColor: '#999ac6',
      botFontColor: '#fff',
      userBubbleColor: '#fff',
      userFontColor: '#4a4a4a',
    };
    return (
      <div>
        <Grid container style={{height:"100vh"}}>
        <Grid textAlign="center" width="50%" justify="flex-start" item xs={12} lg={6} style={{backgroundColor: '#ffe0eb', color: 'black'}}>
        
        <div class="centered" style={{display:'flex'}}>
        <div style={{width:'80%'}}>
        <ThemeProvider theme={theme}>
      <ChatBot
     headerTitle="Ada"
     speechSynthesis={{ enable: true, lang: 'sp' }}
        steps={[
          {
            id: '1',
            message: 'A que lugar vas?',
            trigger: 'lugar'
          },
          {
            id: 'lugar',
            options: [
              { value: 'casa', label: 'casa', trigger: '3' },
              { value: 'escuela', label: 'escuela', trigger: '3' },
              { value: 'plaza', label: 'plaza', trigger: '3' },
              { value: 'restaurante', label: 'restaurante', trigger: '3' },
            ],
          },
          {
            id: '3',
            message: 'Cuanto tiempo vas a tardar?',
            trigger: 'tiempo',
          },
          {
            id: 'tiempo',
            options: [
              { value: '150000', label: '15 min', trigger: '7' },
              { value: '300000', label: '30 min', trigger: '7' },
              { value: '600000', label: '1 hora', trigger: '7' },
              { value: '1200000', label: '2 horas', trigger: '7' },
            ],
          },
          {
            id: '7',
            message: 'Excelente!, Revisemos la informacion',
            trigger: 'review',
          },
          {
            id: 'review',
            component: <Review />,
            asMessage: true,
            trigger: 'update',
          },
          {
            id: 'update',
            message: 'Quieres cambiar algun dato?',
            trigger: 'update-question',
          },
          {
            id: 'update-question',
            options: [
              { value: 'yes', label: 'Yes', trigger: 'update-yes' },
              { value: 'no', label: 'No', trigger: 'buen-viaje' },
            ],
          },
          {
            id: 'update-yes',
            message: 'Que deseas cmabiar?',
            trigger: 'update-fields',
          },
          {
            id: 'update-fields',
            options: [
              { value: 'lugar', label: 'Lugar', trigger: 'update-lugar' },
              { value: 'tiempo', label: 'Tiempo', trigger: 'update-tiempo' },
            ],
          },
          {
            id: 'update-lugar',
            update: 'lugar',
            trigger: '7',
          },
          {
            id: 'update-tiempo',
            update: 'tiempo',
            trigger: '7',
          },
          {
            id: 'buen-viaje',
            message: 'buen viaje',
            trigger: 'wait'
          },
          {
            id: 'wait',
            message: 'llegaste?',
            delay: 10000,
            trigger: 'llegaste',
          },
          {
            id: 'llegaste',
            options: [
              { value: 'si', label: 'Yes', trigger: 'end-message' },
              { value: 'no', label: 'No', trigger: 'end-message' },
            ]
          },
          {
            id: 'end-message',
            message: 'Gracias, sus datos han sido guardados!',
            end: true,
          },
        ]}
      /></ThemeProvider>
      </div>
      </div>
      </Grid>
      <Grid textAlign="center" width="50%" justify="flex-start" item xs={12} lg={6} style={{backgroundColor: '#fffcfd', color: 'black'}}>
      <Container class="centered">
          <div>
            <div>
            <Link to="/profile">
            <Fab variant="rounded"  marginTop="12"alignItems="center"style={{backgroundColor: '#f09eba'}}> <Account/> </Fab>
            </Link>
            </div>
            <br/>
            <br/>
            <Link to="/">
            <Fab variant="rounded" marginTop="12" alignItems="center" width="200" style={{backgroundColor: '#f09eba'}}>Cerrar sesion</Fab>
            <br/>
            </Link>
            </div>
            </Container >
      </Grid>
      </Grid>
      </div>
    );
  }
}

export default SimpleForm;