'use strict';

const { get } = require('axios');

class Handler {
  constructor({ rekoSvc, translatorSvc }) {
    this.rekoSvc = rekoSvc;
    this.translatorSvc = translatorSvc;
  }

  async detectImageLabels(buffer) {
    const result = await this.rekoSvc.detectLabels({
      Image: {
        Bytes: buffer
      }
    }).promise();
    // console.log(result.Labels);

    const workingItems = result.Labels
      .filter(({ Confidence }) => Confidence > 80);
    
    const names = workingItems
      .map(({ Name }) => Name)
      .join(' and ');

    return { names, workingItems };
  }
  async translateText(text) {
    const params = {
      SourceLanguageCode: 'en',
      TargetLanguageCode: 'pt',
      Text: text,
    };

    const { TranslatedText } = await this.translatorSvc
                    .translateText(params)
                    .promise();

    return TranslatedText.split(' e ');
  }
  formatTextResults(texts, workingItems) {
    const finalText = [];
    for (let indexText in texts) {
      const nameInPortuguese = texts[indexText];
      const confidence = workingItems[indexText].Confidence;
      finalText.push(
        ` ${confidence.toFixed(2)}% de chance de ser do tipo ${nameInPortuguese}`
      );
    }
    return finalText.join('\n');
  }
  async getImageBuffer(imageUrl) {
    const response = await get(imageUrl, {
      responseType: 'arraybuffer'
    });
    const buffer = Buffer.from(response.data, 'base64');
    return buffer;
  }
  async main(event) {
    try {
      // const imgBuffer = await readFile('./images/cat.jpg');
      const { imageUrl } = event.queryStringParameters;

      console.log(`downloading image ${imageUrl}...`);
      const buffer = await this.getImageBuffer(imageUrl);

      const { names, workingItems } = await this.detectImageLabels(buffer);

      console.log('translating to portuguese...');
      const texts = await this.translateText(names);

      console.log('handling final text...');
      const finalText = this.formatTextResults(texts, workingItems);

      console.log('finishing...');

      return {
        statusCode: 200,
        body: `A imagem tem\n `.concat(finalText)
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: 'Internal server error!',
        error: error.message
      };
    }
  }
}

const aws = require('aws-sdk');
const { runInThisContext } = require('vm');
const reko = new aws.Rekognition();
const translator = new aws.Translate();
const handler = new Handler({
  rekoSvc: reko,
  translatorSvc: translator,
});
module.exports.main = handler.main.bind(handler);
