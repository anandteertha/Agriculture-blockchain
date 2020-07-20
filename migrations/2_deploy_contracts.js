var agriculture = artifacts.require("./agriculture.sol");

module.exports = function(deployer) {
  deployer.deploy(agriculture);
};
