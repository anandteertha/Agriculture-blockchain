pragma solidity ^0.5.0;
//import "github.com/ethereum/dapp-bin/library/stringUtils.sol";

contract agriculture {


  struct farmer {
    uint id;
    string adhar_number;
    string name_of_farmer;
    //string address_of_farmer;
    bool validity;  //is he eligible to to get the goverment's money
    string info; //information provided by the goverment regarding the payment of money.
    string bank_account;
    string acre_of_land;  //the acre of land the farmer owns
    string residence_sate;  //the state where his farm belongs.

  }

  struct goverment {
    uint id;
    uint price_per_acre;  //this is usually decided by the state goverment how much money they want to give to their farmers depending upon the acre's of land they own.
    string state_name;

  }

  struct blockchain_structure {

      uint id;
      string data;
      uint nonce;
      address hash;
      address previous_hash;
      uint timestamp;

  }

  struct database_account {

      uint id;
      string username;
      string password;
  }

  mapping(uint => farmer) public farmers_dict;
  mapping(uint => goverment) public goverments_dict;
  mapping(uint => blockchain_structure) public blockchain;
  mapping(uint => database_account)public database_accounts;


  uint public number_of_farmers = 0;
  uint public number_of_goverment = 0;
  uint public number_of_blocks = 0;
  uint public number_of_accounts_created = 0;
  uint public current_account_id = 0;
  uint lastcheckForValidity_numberOfFarmers = 0;

  function databaseAccount(string memory _username, string memory _password) public {

        number_of_accounts_created++;
        database_accounts[number_of_accounts_created].id = number_of_accounts_created;
        database_accounts[number_of_accounts_created].username = _username;
        database_accounts[number_of_accounts_created].password = _password;


  }

  function equal(string memory _a, string memory _b) private pure returns(bool){
      bytes memory aa = bytes(_a);
      bytes memory bb = bytes(_b);

      if(keccak256(aa) == keccak256(bb))
        return true;
      else
        return false;
  }


  function login(string memory _username,string memory _password) public {
        for(uint i=1;i<=number_of_accounts_created;i++){
            if(equal(database_accounts[i].username,_username)){
                if(equal(database_accounts[i].password,_password)){
                    current_account_id = database_accounts[i].id;
                }
            }
        }
  }

  function createFarmerAccount(string memory _adhar_number,string memory _name_of_farmer,
                                string memory _bank_account ,string memory _acre_of_land,string memory _state_of_residence) public

        {




            number_of_farmers++;
            farmers_dict[number_of_farmers].adhar_number = _adhar_number;
            farmers_dict[number_of_farmers].name_of_farmer = _name_of_farmer;
            //farmers_dict[number_of_farmers].address_of_farmer = _address_of_farmer;
            farmers_dict[number_of_farmers].bank_account = _bank_account;
            farmers_dict[number_of_farmers].acre_of_land = _acre_of_land;
            farmers_dict[number_of_farmers].residence_sate = _state_of_residence;
            farmers_dict[number_of_farmers].id = number_of_farmers;
            farmers_dict[number_of_farmers].validity = false;
            farmers_dict[number_of_farmers].info = "PLEASE WAIT TILL AN OFFICIAL CONFIRMS YOUR DOCUMENTS.....";


        }

  function createGovermentAccount(uint _price_per_acre,string memory _state_name) public{

            number_of_goverment++;
            goverments_dict[number_of_goverment].id = number_of_goverment;
            goverments_dict[number_of_goverment].price_per_acre = _price_per_acre;
            goverments_dict[number_of_goverment].state_name = _state_name;

  }
  /*

  function checkValidityOfDocuments(string memory _state_name) public returns(string memory) {

            if(lastcheckForValidity_numberOfFarmers == 0){
                return("no farmers added");
            }
            else{
                for(uint i=lastcheckForValidity_numberOfFarmers;i<=number_of_farmers;i++){
                    if(farmers_dict[i].validity == false){

                    }
                }
            }

  }

  */


}
