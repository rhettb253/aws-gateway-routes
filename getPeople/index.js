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
  
  try{
    // the q-mark below is a conditional chaining marker that says if event.pathParameters does not exist than send me back undefined and don't check what comes next, OR if the property does exist than send us back its 'id' property
    const id = event.pathParameters?.id;
    let results;
    if (id) {
      // if we send an id get one
      const list = await peopleModel.query("id").eq(id).exec();
      results = list[0];
    } else {
      // if we don't send an id get one
      results = await peopleModel.scan().exec();
    }
    response.statusCode = 200;
    response.body = JSON.stringify(results);
  } catch (e) {
    response.statusCode = 500;
    response.body = JSON.stringify(e.message);
  }
  
  return response;
};