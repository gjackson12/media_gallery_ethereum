# Design Pattern Decisions

While writing my contract I explored a number of design patterns to verify if they would be of use in the context of my application.

In the sections below I provide my rationale for why or why I didn't use a particular pattern.

## 1. Fail Early, Fail Loud

I elected to follow this pattern because it seems to be more so an ecouraged best practice. I implemented this pattern by leveraging require statements at the beginning of functions, and by always using require statements in lieu of silent returns. This is important because a require statement will revert all changes to state variables, while a manual return from the function will not. 

Example from the MediaGallery contract:
```
function addMedia(
    string _name,
    string _description,
    string _mediaHash,
    string _tags,
    string _mediaType,
    string _extension
    ) public  stoppedInEmergency {
    require(validateName(_name), "Name is too long...");
    require(validateDesc(_description), "Description is too long...");
    require(validateTags(_tags), "Tags is too long...");
    require(validateHashLength(_mediaHash), "Hash is too long...");
    //Store media asset information in memory
    MediaAsset memory currentMedia;
```

## 2. Restricting Access

I have restricted access to select functions that are relative to administration of the contract. One example is the `stopContract` contract function which allows the owner of the contract to stop core functionlaity of the contract in the case of an emergency. In order to implement this restriction I've leveraged the Open Zeppelin framework library, `Ownable`.

Additionally, I have made validation functions that are only used internally, internal functions.

## 3. Auto Deprecation

I chose not to leverage the auto deperecation pattern because I did not have a functional reason to have the contract expire at a parictular time.

## 4. Mortal

## 5. Withdrawl Pattern

The MediaGallery contract I wrote does not have a requirement to handle funds, so this pattern was not relevant to the functionlaity of my application. 

## 6. Emergency Stop/Circuit Breaker

We were reuqired to implement this design pattern for our application. I implemented this pattern by leveraging the Ownable library from the Open Zeppelin framework. This provides my contract a modiifer, `onlyOwner`, that checks to ensure that the person attempting to execute a function is the owner of the contract. 

I then created two functions: 

* `stopContract`: This function sets a contract state variable called `isStopped` to true. 
* `resumeContract`: This function sets a contract state variable called `isStopped` to false.

I then created a modifier called `stoppedInEmergency` that checks to make sure that the contract state variable `isStopped` is false, if it is true the contract reverts, and an error is thrown. I applied this modifier to the contract's `addMedia` function so that during emergencies I can stop users from having the ability to add new media.

## 6. State Machine

The application/contract I created does not require the concept of states or transiitons. 

## 7. Speed Bump

The speed bump pattern did not seem to make sense for my application/contract because I'm not allowing users to withdraw funds, or any functionality that needs to be limited or time-boxed.
