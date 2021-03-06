const { readFileSync, writeFileSync } = require('fs');
const { execSync } = require('child_process');

const toml = require('toml');

const VARIABLES_FILE_PATH = './docs/variables.json';
const PYPROJECT_FILE_PATH = '../pyproject.toml';
const COMMAND_RASA_SDK_VERSION =
  'python -c "from rasa_sdk import __version__ as rasa_sdk_version; print(rasa_sdk_version)"';
const DISCLAIMER = 'this file is automatically generated, please do not update it manually';
const JSON_SPACE_INDENT = 4;

const getRasaVersion = () => {
  const pyproject = readFileSync(PYPROJECT_FILE_PATH).toString();
  return toml.parse(pyproject).tool.poetry.version;
};

const getRasaSdkVersion = () => execSync(COMMAND_RASA_SDK_VERSION).toString().trim();

const writeVariablesFile = () => {
  const variables = JSON.stringify(
    {
      release: getRasaVersion(),
      rasa_sdk_version: getRasaSdkVersion(),
    },
    null,
    JSON_SPACE_INDENT,
  );
  writeFileSync(VARIABLES_FILE_PATH, variables);
};

console.info(`Computing docs variables and writing to ${VARIABLES_FILE_PATH}`);
writeVariablesFile();
