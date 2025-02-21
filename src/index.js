'use strict'

import { create, Flex } from 'smbls'

import designSystem from './designSystem'
import * as components from './components'
import pages from './pages'

console.log('npm variables', process.env)

create({
  extend: Flex,

  props: {
    theme: 'document',
    flow: 'column',
    height: '100vh',
    align: 'center space-between',
    justifyContent: 'center',
    fontFamily: 'Europa'
  },

  content: {}
}, {
  designSystem,
  components,
  pages
})
