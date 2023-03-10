const fs = require('fs');

class Config {
  constructor() {
    this._config = "snireverseproxy.conf";
    this.config = {};
    this.sighup();
  }
  host(name) { return this.config[name]; }
  ports() { return this.config["ports"]; }
  sighup() { 
    if(fs.existsSync(this._config)) {
      this.config = JSON.parse(fs.readFileSync(this._config));
    }
    else {
      console.error(`No config file found: ${this._config}`);
      process.exit(1);
    }     
  }
}


module.exports = new Config();
