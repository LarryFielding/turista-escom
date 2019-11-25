import React from 'react';
import {Link} from 'react-router-dom';

export default class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: {
                error: 0,
                message: ''
            },
            userType : '',
            response: {
                message: '',
                status: false
            }
        };
    }

    change(e) {
        const val = e.target.value;
        this.setState({
            userType : val
        })
    }

    changeScreen() {
        this.props.history.push('/');
    }

    onSubmit(e) {
        e.preventDefault();
        let user = {
            correoElectronico: this.refs.email.value.trim(),
            password: this.refs.password.value.trim(),
            role: this.state.userType,
            numeroTelefono: this.refs.phone.value.trim(),
            nombre: this.refs.fName.value.trim(),
            apellidoPaterno: this.refs.lName.value.trim()
        };

        Meteor.call('users.insert', user, (error, response) => {
           if (error) {
               this.setState({ error });
           } else {
               this.setState({ response, error });
               console.log('resultado de la creación de la cuenta: ', response);
           }
        });


    }

    render() {
        return <div>
            <h1>Crear usuario</h1>

            {this.state.error ? <p>{this.state.error.message}</p> :
                (<div>
                    <p> {this.state.response.message} </p>
                    <button onClick={this.changeScreen.bind(this)}> Ir a Login </button>
                </div>) }

            <form onSubmit={this.onSubmit.bind(this)} noValidate>
                <input type="email" ref="email" name="email" placeholder="Email"/>
                <input type="password" ref="password" name="password" placeholder="Password"/>
                <input type="tel" ref="phone" name="phone" placeholder="Número telefónico"/>
                <input type="text" ref="fName" name="fName" placeholder="Nombre(s)"/>
                <input type="text" ref="lName" name="lName" placeholder="Apellido(s)"/>
                <input type="radio" name="role" onChange={this.change.bind(this)} value="mobile-app-user"/>Usuario app <br/>
                <input type="radio" name="role" onChange={this.change.bind(this)} value="c4-web-user"/>Operador C4 <br/>
                <button>Crear cuenta</button>
            </form>

            <Link to="/"> ¿Ya tienes una cuenta?</Link>
        </div>
    }
}
