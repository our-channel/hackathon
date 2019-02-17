const ipfsAPI = require('ipfs-api');

const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'})

let inst = null;

export default class IpfsAPIService {
  static get instance() {
    if(!inst) {
      inst = new IpfsAPIService();
    }
    return inst;
  }
  
  async uploadFile(buffer) {
    return await new Promise(function(resolve, reject) {
      ipfs.files.add(buffer, function (err, files) {
        if (err) {
          reject(err);
        } else {
          resolve(files[0].hash);
        }
      });
    });
  }

  async downloadFile(cidHash) {
    return await new Promise(function(resolve, reject) {
      ipfs.files.get(cidHash, function (err, files) {
        if (err) {
          reject(err);
        } else {
          resolve(files[0].content.toString('utf8'));
        }
      });
    });
  }
}
