async function handler(event, context) {
    console.log('Ambiente...', JSON.stringify(process.env, null, '\t'));
    console.log('Evento...', JSON.stringify(event, null, '\t'));

    return {
        hello: 'world',
        hey: 'jude',
    };
}

module.exports = {
    handler,
};