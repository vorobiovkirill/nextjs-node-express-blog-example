import React, { ReactNode } from 'react'
import Header from './Header'

type Props = {
  children: ReactNode
}

const Layout: React.FC<Props> = (props) => (
  <>
    <Header />
    <div className="p-8">{props.children}</div>
  </>
)

export default Layout
