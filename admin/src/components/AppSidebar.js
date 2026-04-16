import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CIcon from '@coreui/icons-react'
import { cilFactory, cilNewspaper } from '@coreui/icons'
import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'

import logo from 'src/assets/brand/logo.png'

import { sygnet } from 'src/assets/brand/sygnet'

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarHeader className="border-bottom px-3 py-2 d-flex align-items-center justify-content-between bg-dark shadow-sm">
        <div className="d-flex align-items-center gap-2">
          <CIcon icon={cilNewspaper} size="xl" className="text-white" />
          <span
            className="text-white"
            style={{
              fontSize: '1.3rem',
              fontWeight: 700,
              letterSpacing: '1px',
              fontFamily: 'Segoe UI, sans-serif',
              textTransform: 'uppercase',
            }}
          >
            Top Headlines
          </span>
        </div>

        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />
      </CSidebarHeader>

      <AppSidebarNav items={navigation} />
      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
        />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
