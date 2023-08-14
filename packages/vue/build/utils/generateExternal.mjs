import packageJson from '../../package.json' assert { type: 'json' };

const { dependencies, peerDependencies } = packageJson;

const allDependencies = [...Object.keys(dependencies), ...Object.keys(peerDependencies)];

function makeExternalPredicate (externalArr) {
  if (externalArr.length === 0) return () => false;
  const pattern = new RegExp(`^(${externalArr.join('|')})($|/)`);
  return id => pattern.test(id);
}

export default makeExternalPredicate(allDependencies);
