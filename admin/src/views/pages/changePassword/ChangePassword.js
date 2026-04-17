import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CButton,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilLockUnlocked } from '@coreui/icons'

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleToggle = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const token = JSON.parse(secureLocalStorage.getItem('logininfo'))?.token

      const res = await fetch(setting.api + '/api/users/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (data.status) {
        alert('Password changed successfully ✅')

        setFormData({
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        })
      } else {
        alert(data.message || 'Error')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className=" d-flex align-items-center justify-content-center">
      <CCol xs={12} sm={10} md={8} lg={6}>
        <CCard
          className="shadow-lg border-0"
          style={{ borderRadius: '1.5rem', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
        >
          <CCardHeader
            className="text-white text-center bg-dark"
            style={{ borderTopLeftRadius: '1.5rem', borderTopRightRadius: '1.5rem' }}
          >
            <h4 className="my-2">
              <CIcon icon={cilLockLocked} className="me-2" />
              Change Password
            </h4>
          </CCardHeader>
          <CCardBody className="p-4">
            <CForm onSubmit={handleSubmit}>
              <div className="mb-4">
                <CFormLabel htmlFor="oldPassword" className=" fw-bold">
                  Old Password
                </CFormLabel>
                <CInputGroup>
                  <CFormInput
                    type={showPasswords.old ? 'text' : 'password'}
                    name="oldPassword"
                    value={formData.oldPassword}
                    onChange={handleChange}
                    placeholder="Enter your current password"
                    className="form-control border border-primary"
                    required
                  />
                  <CInputGroupText
                    onClick={() => handleToggle('old')}
                    role="button"
                    style={{ cursor: 'pointer', backgroundColor: '#e3f2fd' }}
                  >
                    <CIcon icon={showPasswords.old ? cilLockUnlocked : cilLockLocked} />
                  </CInputGroupText>
                </CInputGroup>
              </div>

              <div className="mb-4">
                <CFormLabel htmlFor="newPassword" className=" fw-bold">
                  New Password
                </CFormLabel>
                <CInputGroup>
                  <CFormInput
                    type={showPasswords.new ? 'text' : 'password'}
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder="Enter a new password"
                    className="form-control border border-success"
                    required
                  />
                  <CInputGroupText
                    onClick={() => handleToggle('new')}
                    role="button"
                    style={{ cursor: 'pointer', backgroundColor: '#d4edda' }}
                  >
                    <CIcon icon={showPasswords.new ? cilLockUnlocked : cilLockLocked} />
                  </CInputGroupText>
                </CInputGroup>
              </div>

              <div className="mb-4">
                <CFormLabel htmlFor="confirmPassword" className=" fw-bold">
                  Confirm Password
                </CFormLabel>
                <CInputGroup>
                  <CFormInput
                    type={showPasswords.confirm ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-type new password"
                    className="form-control border border-danger"
                    required
                  />
                  <CInputGroupText
                    onClick={() => handleToggle('confirm')}
                    role="button"
                    style={{ cursor: 'pointer', backgroundColor: '#f8d7da' }}
                  >
                    <CIcon icon={showPasswords.confirm ? cilLockUnlocked : cilLockLocked} />
                  </CInputGroupText>
                </CInputGroup>
              </div>

              <div className="text-center">
                <CButton
                  type="submit"
                  color="gradient"
                  className="px-4 py-2 bg-primary"
                  style={{
                    color: '#fff',
                    border: 'none',
                  }}
                >
                  Change Password
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </div>
  )
}

export default ChangePassword
