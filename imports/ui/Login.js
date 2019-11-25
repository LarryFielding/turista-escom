import React from 'react'
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            msg: ''
        };
    }

    onSubmit(e) {
        e.preventDefault();

        let email = this.refs.email.value.trim();
        let password = this.refs.password.value.trim();

        Meteor.call('user.login', email, password, (err) => {
            if (err) {
                this.setState({msg: `No se puede iniciar sesión: ${err.error}`});
            } else {
                Meteor.loginWithPassword({email}, password, (err) => {
                    if (err) {
                        this.setState({msg: err.reason});
                    }
                });
            }
        });
    }

    verifyNumber(e) {
        e.preventDefault();
        let telefono = this.refs.telefono.value.trim();
        let codigo = parseInt(this.refs.codigo.value, 10);

        Meteor.call('users.validate.phoneNumber', telefono, codigo, (err, resp) => {
            if (err) {
                console.log(err);
            } else {
                console.log(resp);
                resp
                    ? this.setState({msg: 'Verificación exitosa, ahora puede acceder a su cuenta.'})
                    : this.setState({msg: 'No se pudo verificar su número'});
            }
        });
    }

    render() {
        return (
            <div>
                <h1>Login</h1>

                {this.state.msg ? <p>{this.state.msg}</p> : undefined}

                <form onSubmit={this.onSubmit.bind(this)} noValidate>
                    <input type="email" ref="email" name="email" placeholder="Email"/>
                    <input type="password" ref="password" name="password" placeholder="Password"/>
                    <button>Iniciar sesión</button>
                </form>
                <h4>Formulario de prueba [código de verificación]</h4>
                <form onSubmit={this.verifyNumber.bind(this)} noValidate>
                    <input type="text" ref="telefono" name="telefono" placeholder="telefono"/>
                    <input type="number" ref="codigo" name="codigo" placeholder="codigo"/>
                    <button>Verificar número</button>
                </form>

                <Link to="/signup"> ¿Quieres crear una cuenta? </Link>
            </div>
        );
    }
}
