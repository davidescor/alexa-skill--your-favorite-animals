const Alexa = require('ask-sdk-core');
const i18n = require('i18next');

const GetNewFactHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    // checks request type
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest'
        && request.intent.name === 'GetNewFactIntent');
  },
  handle(handlerInput) {


    return handlerInput.responseBuilder
      .speak("Bienvenido a la skill, tus animales favoritos. Dime el nombre de un animal para escuchar su sonido o pídeme ayuda.")
      .reprompt("Bienvenido a la skill, tus animales favoritos. Dime el nombre de un o pídeme ayuda.")
      .getResponse();
  },
};

const AnimalHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    // checks request type
    return request.type === 'IntentRequest'
      && request.intent.name === 'AnimalIntent';
  },
  handle(handlerInput) {


    return handlerInput.responseBuilder
      .speak(searchAnimal(handlerInput))
      .reprompt(searchAnimal(handlerInput))
      .getResponse();
  },
};

function searchAnimal(handlerInput){
    
  const requestValue = handlerInput.requestEnvelope.request;
  const animalValue = requestValue.intent.slots.animal.value;
  const textAnimal = "Este es el sonido de un "+animalValue+". ";
  const soundAnimal = "<audio src='https://app-sound.s3.eu-west-3.amazonaws.com/"+animalValue+".mp3' />";
  const cont = "Di, no más animales para salir o di el nombre de otro animal para escuchar su sonido.";
  
  return textAnimal+soundAnimal+cont;
  
  
}


const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak("Esta es la lista de animales disponibles: Abeja, Alce, Buffalo, Buitre, Caballo, Cabra, Canario, Cerdo, Chancho, Cordero, Cuyes, Delfin, Elefante, Foca, Gallina, Gallo, Gaviota, Grillo, Halcon, Jaguar, Lechuza, Leon, Leopardo, Lobo, Loro, Pavo, Perro, Pollos, Rana, Rinoceronte, Ruiseñor, Serpiente, Tigre y toro. Di un animal para escuchar su sonido:")
      .reprompt("Esta es la lista de animales disponibles: Abeja, Alce, Buffalo, Buitre, Caballo, Cabra, Canario, Cerdo, Chancho, Cordero, Cuyes, Delfin, Elefante, Foca, Gallina, Gallo, Gaviota, Grillo, Halcon, Jaguar, Lechuza, Leon, Leopardo, Lobo, Loro, Pavo, Perro, Pollos, Rana, Rinoceronte, Ruiseñor, Serpiente, Tigre y toro. Di un animal para escuchar su sonido:")
      .getResponse();
  },
};


const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak("Cerrando la skill, tus animales favoritos, hasta pronto!")
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak("Cerrando la skill, tus animales favoritos, hasta pronto!")
      .getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);
    console.log(`Error stack: ${error.stack}`);
    return handlerInput.responseBuilder
      .speak("Error")
      .reprompt("Error")
      .getResponse();
  },
};


const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    GetNewFactHandler,
    AnimalHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler,
  )
  .addErrorHandlers(ErrorHandler)
  .withCustomUserAgent('sample/basic-fact/v2')
  .lambda();
