
function defaultTemplate(
  {template},
  _,
  {imports, componentName, jsx, exports},
) {
  const typeScriptTpl = template.smart({plugins: ['jsx', 'typescript']});
  const IconComponentName = componentName.name.slice(3);

  return typeScriptTpl.ast`
    ${imports}
    import { IconProps } from '../index'
    const ${IconComponentName} = (props: IconProps) => ${jsx};
    export default ${IconComponentName};
  `;
}
module.exports = defaultTemplate;
