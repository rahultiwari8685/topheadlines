import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CButton,
  CRow,
  CCol,
} from '@coreui/react'

import secureLocalStorage from 'react-secure-storage'
import setting from '../../../setting.json'

const Profile = () => {
  const loginInfo = JSON.parse(secureLocalStorage.getItem('logininfo') || '{}')

  const userId = loginInfo?.user?.id

  const [user, setUser] = useState(null)

  const getProfile = async () => {
    try {
      const res = await fetch(`${setting.api}/api/users/getUserById/${userId}`)

      const result = await res.json()

      if (result.status) {
        setUser(result.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProfile()
  }, [])

  return (
    <CCard className="shadow border-0 rounded-4">
      <CCardHeader className="bg-dark text-white">
        <h5 className="mb-0">My Profile</h5>
      </CCardHeader>

      <CCardBody>
        {user && (
          <CForm>
            <CRow className="mb-3">
              <CCol md={6}>
                <CFormInput label="Name" value={user.name} readOnly />
              </CCol>

              <CCol md={6}>
                <CFormInput label="Email" value={user.email} readOnly />
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol md={6}>
                <CFormInput label="Phone" value={user.phone || ''} readOnly />
              </CCol>

              <CCol md={6}>
                <CFormInput
                  label="Role"
                  value={
                    user.role === '1'
                      ? 'Admin'
                      : user.role === '2'
                        ? 'Editor'
                        : user.role === '3'
                          ? 'Correspondent'
                          : 'Subscriber'
                  }
                  readOnly
                />
              </CCol>
            </CRow>

            <CButton color="primary">Update Profile</CButton>
          </CForm>
        )}
      </CCardBody>
    </CCard>
  )
}

export default Profile
