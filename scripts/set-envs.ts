const {writeFileSync, mkdirSync} = require('fs');


require('dotenv').config();

const targetPath = './src/environments/environments.ts';

const envFileContent = `
export const environment = {
mapbox_key: "${process.env['MAPBOX_KEY'] }",
otra: "PROPIEDAD",
};
`;
//aca le estoy diciendo que si es verdadero me lo suscriba
mkdirSync('.src/environments', {recursive: true});

writeFileSync(targetPath, envFileContent)

