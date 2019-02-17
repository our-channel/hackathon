import React from 'react';

import ProgressModal from './ProgressModal';

import {
    InputGroup,
    InputGroupAddon,
    Input,
    Button,
} from 'reactstrap';

export default class Signup extends React.Component {
    constructor(props){
        super(props);

        this.handleSignup = this.handleSignup.bind(this);
    }

    renderModal = () => {
        return this.props.loading ? (
            <ProgressModal
            modal={this.props.loading}
            />
        ) : null;
  };

    handleSignup(){
        this.props.createID();
    }
    render(){
        return (
            <div className="signup-container">
                <div className="logo-container">
                    <div>
                        <img src={require('../../imgs/globe_logo_green.png')} alt='logo'
                            height='60px'
                            className="signup-logo-image"
                        />
                        <h1 className="signup-logo-text">ur Channel</h1> 
                    </div>
                    <div className="input-container">
                        <InputGroup>
                            <InputGroupAddon addonType="prepend" className="username-input-icon">@</InputGroupAddon>
                            <Input placeholder="username" maxLength={50} className="username-input" />
                        </InputGroup>
                    </div>
                    <div className="button-container">
                        <Button className="button" onClick={this.handleSignup} size="lg">Sign Up</Button>
                    </div>
                </div>
                {this.renderModal()}
            </div>
        )
    }
}
