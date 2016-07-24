import React from 'react'
import s from './Layout.scss'

import Atm from '../../containers/Atm'

const Layout = () => (
  <main className={s.root}>
    <Atm />
  </main>
)

export default Layout