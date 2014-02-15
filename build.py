#!/usr/local/bin/python
import ruff as r
import ruffx.command
import ruffx.typescript
import ruffx.sass
import ruffx.npm


# Paths
base = r.path(__file__, __file__)


## Common libraries
def libs():

  # Sass
  ruffx.sass.compile(base, ['public', 'css', 'styles.scss.css'], ['src', 'css', 'styles.scss'])

  # Typescript
  ruffx.typescript.compile(base, ['public', 'js', 'hatchd.ts.js'], ['src', 'hatchd', '__init__.ts'])
  ruffx.typescript.compile_files(base, ['public', 'js', 'widgets'], ['src', 'hatchd', 'widgets'])


## Serve content for dev
def server():

  # Common libraries
  libs()

  # Start a local server
  r.serve('0.0.0.0', 3001, r.path(__file__, 'public'))
  r.run()


## Build content
def rebuild():
  ruffx.build()

  # Npm
  ruffx.npm.install(base)

  # Common libraries
  libs()


if __name__ == '__main__':
  ruffx.command.register('rebuild', rebuild)
  ruffx.command.register('server', server)
  ruffx.command.register('default', 'rebuild')
  ruffx.command.run()
