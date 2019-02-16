const ipfsAPI = require('ipfs-api');

const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'})

export default class IpfsAPIService {
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
