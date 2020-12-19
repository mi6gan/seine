module.exports = {
  name: 'setup',
  factory: () => ({
    hooks: {
      setupScriptEnvironment(project, env) {
        if (/^test(:.+)?/.test(env['npm_lifecycle_event'])) {
          env.NODE_ENV = 'test';
        } else if (!env.NODE_ENV) {
          env.NODE_ENV = 'production';
        }
        if (env.NODE_ENV === 'development') {
          env.NODE_OPTIONS = [
            ...(env.NODE_OPTIONS ? [env.NODE_OPTIONS] : []),
            `--require browser-env/register`,
            `--require regenerator-runtime/runtime`,
            `--require @babel/register`,
          ].join(' ');
        }
      },
    },
  }),
};
