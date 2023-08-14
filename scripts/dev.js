const spawn = require('cross-spawn');

let target = process.argv[2];
const alias = {
  core: '@mathieustan/intercom',
  vue: '@mathieustan/vue-intercom',
};
target = alias[target] || target;

if (!target) {
  spawn('npx', ['lerna', 'run', 'dev', '--scope=' + alias.core, '--stream'], { stdio: 'inherit' });
} else {
  spawn('npx', ['lerna', 'run', 'dev', '--scope=' + target, '--stream'], { stdio: 'inherit' });
}
