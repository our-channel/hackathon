const axios = require('axios');
const _ = require("lodash");

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
      "https://api.thegraph.com/subgraphs/name/realdave/channelcreated",
      {
        query: "query($holderAddress: String!) { createdChannels(holderAddress: $holderAddress) { id holderAddress channelContractAddress publicKey userName } }",
        variables: { "holderAddress": holderAddress },
      }
    );
    let hits = _.get(events, "data.data.createdChannels", []);
    hits = hits.filter(h=>{
      return h.holderAddress.toLowerCase()===holderAddress.toLowerCase()
    });
    return hits;
  }
}
