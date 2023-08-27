const fs = require('fs');
const componentTemplatePath = './templates/components/';

module.exports = function (input) {

  var a = ['a', 'b', 'c', 'd'];
  const formStartString = '<form>';
  const formEndString = '</form>';

  const readTemplate = (templatePath) => {
    try {
      return fs.readFileSync(templatePath, 'utf-8');
    } catch (error) {
      console.error('Error reading file:', error.message);
      return null;
    }
  }

  const createInput = (displayField, valueField, type) => {
    let inputTemplate = readTemplate(componentTemplatePath + 'input.txt');
    inputTemplate = inputTemplate.replace('<<displayField>>', displayField);
    inputTemplate = inputTemplate.replace('<<valueField>>', valueField);
    inputTemplate = inputTemplate.replace('<<type>>', type);
    return inputTemplate;
  }

  const createHeader = (headerType, value) => {
    return `<${headerType}>${value}</${headerType}>`
  }

  const generateCode = (code, input) => {
    switch (input.xtype) {
      case 'h1':
        code += createHeader('h1', input.value) + '\n';
        break;

      case 'text':
        code += createInput(input.displayField, input.valueField, 'text') + '\n';
        break;

      case 'number':
        code += createInput(input.displayField, input.valueField, 'number') + '\n';
        break;

      case 'button':
        code += createButton(inout.displayField) + '\n';
        break;

      default:
        console.log('Error', 'Component is not supported.');
        break;
    }
    if (input.hasOwnProperty('childrens')) {
      const childrens = input.childrens;
      for (let index = 0; index < childrens.length; index++) {
        code += generateCode('', childrens[index]);
      }
    }
    return code;
  }

  generateAppJS = (input) => {
    const code = generateCode('', input);
    let appJSTemplate = readTemplate(componentTemplatePath + 'app.txt');
    appJSTemplate = appJSTemplate.replace('<<code>>', code);
    return appJSTemplate;
  }

  return generateAppJS(input);

}


