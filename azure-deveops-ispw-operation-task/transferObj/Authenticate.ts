class Authenticate implements IspwResponse {
    pkcs: string;
    certificate: string;
    cesToken: string;
  
    constructor(pkcs: string, certificate: string, cesToken: string) {
      this.pkcs = pkcs;
      this.certificate = certificate;
      this.cesToken = cesToken;
    }
  }
  
  module.exports = Authenticate;
  