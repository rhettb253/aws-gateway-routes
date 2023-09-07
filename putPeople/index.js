// we can bring in dynamoose because we imported it in vs code and brought in the node modules & packages with our zipped files
const dynamoose = require('dynamoose');

// make a schema
const schema = new dynamoose.Schema({id: String, name: String, age: Number});

const peopleModel = dynamoose.model("people", schema);

exports.handler = async (event) => {
  // TODO implement
  const response = {
    statusCode: null,
    body: null,
  };
  
  let parsedBody = JSON.parse(event.body);
  try{ 
    let results = await peopleModel.update({"id": event.pathParameters.id}, parsedBody);
    response.statusCode = 200;
    response.body = JSON.stringify(results);
  } catch (e) {
    response.statusCode = 500;
    response.body = JSON.stringify(e.message);
  }
  
  return response;
};