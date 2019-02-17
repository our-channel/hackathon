const axios = require('axios');

let inst = null;

export default class ChannelCreatedService {
  static get instance() {
    if(!inst) {
      inst = new ChannelCreatedService();
    }
    return inst;
  }
  
  async getCreatedChannels(holderAddress) {
    var events = await axios.post(
      "https://api.thegraph.com/subgraphs/name/realdave/chancreated",
      {
        query: "query($holderAddress: String!) { createdChannels(holderAddress: $holderAddress) { id holderAddress channelContractAddress publicKey } }",
        variables: { "holderAddress": holderAddress },
      }
    );

    return events.data.createdChannels;
  }
}
