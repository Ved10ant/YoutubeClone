const { translate } = require('google-translate-api-x');

async function testTranslation() {
  try {
    const res = await translate('Hello world', { to: 'es' });
    console.log('Original: Hello world');
    console.log('Translated:', res.text);
    if (res.text === 'Hola Mundo' || res.text === 'Hola mundo') {
        console.log('SUCCESS: Translation works.');
    } else {
        console.log('WARNING: Translation result unexpected but might be correct.');
    }
  } catch (e) {
    console.error('ERROR: Translation failed', e);
  }
}

testTranslation();
