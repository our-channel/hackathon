import Blockies from 'react-blockies';
import React from 'react';

export default class Contact {
  constructor(props) {
    this.idContractAddress = props.idContractAddress;
    this.blockie = (
      <Blockies
        seed={this.idContractAddress}
        scale={5}
      />
    );
    this.name = props.name;
  }
}
