#!/usr/local/bin/python
import ruff
import ruffx.utility
import ruffx.command
import ruffx.typescript
import ruffx.sass
import ruffx.npm


# Paths
base = ruff.path(__file__, __file__)




## Common libraries
def libs():

  # Sass
  build = ruffx.sass.compile(base, ['public', 'css', 'styles.scss.css'], ['src', 'css', 'styles.scss'])
  build.depend(ruffx.utility.clean(base, ['public', 'css'], ['.*\.css$']))
  build.depend(ruffx.utility.clean(base, ['public', 'js'], ['.*\.ts$', '.*\.js$']))

  # Typescript
  ruffx.typescript.compile(base, ['public', 'js', 'dsync.js'], ['lib', 'dsync', 'src', '__init__.ts'])
  ruffx.typescript.compile(base, ['public', 'js', 'x.js'], ['src', 'x', '__init__.ts'])
  ruffx.typescript.compile(base, ['public', 'js', 'xx.js'], ['src', 'xx', '__init__.ts'])
  ruffx.typescript.compile(base, ['public', 'js', 'float.js'], ['src', 'float', '__init__.ts'])


## Tests
def tests():
  ruffx.typescript.test(base, ['public', 'js', 'tests.js'], ['src', 'tests', '__init__.ts'])


## Serve content for dev
def server(build=False):

  # Npm
  ruffx.npm.install(base)

  # Republish dependencies
  ruffx.npm.bower_publish(base, ['public', 'js', 'libs'], ['pixi.js', 'box2d.js'])

  # Common libraries
  libs()
  tests()

  # Start a local server
  ruff.serve('0.0.0.0', 3001, ruff.path(__file__, 'public'))

  # Watch for changes
  ruff.run(build=build)


if __name__ == '__main__':
  ruffx.command.register('rebuild', lambda: server(True))
  ruffx.command.register('server', server)
  ruffx.command.register('default', 'rebuild')
  ruffx.command.run()
