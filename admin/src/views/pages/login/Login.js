import React, { useState, useEffect } from 'react'
import { cilUser, cilLockLocked } from '@coreui/icons'
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CForm,
  CFormInput,
  CButton,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'

import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import CIcon from '@coreui/icons-react'
import toast from 'react-hot-toast'

import setting from '../../../setting.json'
import secureLocalStorage from 'react-secure-storage'

import logo from '../../../assets/images/TH_Logo.png'
import admin from '../../../assets/images/TH_Admin.png'

const schema = yup.object().shape({
  email: yup.string().email().required('Enter your valid email'),
  password: yup
    .string()
    .required('Password is required')
    .min(1, 'Password must be at least 1 character'),
})

const Login = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const login = async (data) => {
    setLoading(true)
    console.log('Login data:', data)

    let lg = {
      email: data.email,
      password: data.password,
    }

    try {
      const response = await fetch(setting.api + '/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(lg),
        mode: 'cors',
      })

      // Check server response
      if (!response.ok) {
        throw new Error('Server error. Please try again.')
      }

      const dd = await response.json()

      console.log('API response:', dd)

      if (dd.result === 'success') {
        let loginData = {
          token: dd.token,
          role: dd.role,
          user: dd.user,
        }

        secureLocalStorage.setItem('logininfo', JSON.stringify(loginData))

        toast.success('Login Successful')

        setTimeout(() => {
          navigate('/dashboard')
        }, 1000)
      } else {
        // Show backend message
        toast.error(dd.message || dd.reason || 'Invalid email or password')
      }
    } catch (error) {
      console.error('Login Error:', error)

      toast.error(error.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.bg}>
      <div style={styles.overlay}></div>

      <CContainer className="min-vh-100 d-flex justify-content-center align-items-center">
        <CRow className="justify-content-center w-100">
          <CCol md={5} lg={4}>
            <CCard style={styles.card} className="border-0">
              <CCardBody>
                {/* Logo */}
                <div className="text-center mb-4">
                  <img
                    src={logo}
                    alt="Top Headlines"
                    style={{
                      width: '220px',
                      marginBottom: '0px',
                    }}
                  />
                  {/* <h1 style={styles.brand}>Top Headlines</h1>

                  <p style={styles.subtitle}>Content Management System</p> */}

                  <p
                    style={{
                      color: '#888',
                      fontSize: '13px',
                    }}
                  >
                    Manage News, Categories & Authors
                  </p>
                </div>

                <CForm onSubmit={handleSubmit(login)}>
                  <CInputGroup className="mb-3">
                    <CInputGroupText style={styles.iconBox}>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      type="email"
                      placeholder="Email"
                      style={styles.input}
                      {...register('email')}
                    />
                  </CInputGroup>
                  {errors.email && <p style={styles.error}>{errors.email.message}</p>}

                  {/* <CInputGroup className="mb-3">
                    <CInputGroupText style={styles.iconBox}>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      style={styles.input}
                      {...register('password')}
                    />
                  </CInputGroup> */}

                  <CInputGroup className="mb-3">
                    <CInputGroupText style={styles.iconBox}>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>

                    <CFormInput
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      style={styles.input}
                      {...register('password')}
                    />

                    <CInputGroupText
                      style={{ cursor: 'pointer' }}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? '🙈' : '👁️'}
                    </CInputGroupText>
                  </CInputGroup>
                  {errors.password && <p style={styles.error}>{errors.password.message}</p>}

                  {/* <CButton type="submit" className="w-100 mt-3" style={styles.button}>
                    Sign In
                  </CButton> */}

                  <CButton
                    type="submit"
                    className="w-100 mt-3"
                    style={styles.button}
                    disabled={loading}
                  >
                    {loading ? 'Signing In...' : 'Sign In'}
                  </CButton>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

const styles = {
  bg: {
    background: `
    linear-gradient(
      rgba(0,0,0,0.75),
      rgba(0,0,0,0.85)
    ),
    url(${admin})
  `,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
  },

  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  // card: {
  //   padding: '2rem',
  //   borderRadius: '8px',
  //   background: 'rgba(20,20,20,0.85)',
  //   color: '#fff',
  //   border: '1px solid rgba(255,255,255,0.08)',
  // },

  card: {
    padding: '2.5rem',
    borderRadius: '20px',
    background: 'rgba(15,15,15,0.85)',
    backdropFilter: 'blur(2px)',
    WebkitBackdropFilter: 'blur(2px)',
    border: '1px solid rgba(255,255,255,0.08)',
    boxShadow: '0 15px 40px rgba(0,0,0,0.4)',
  },

  brand: {
    fontWeight: 800,
    fontSize: '1.8rem',
    letterSpacing: '1px',
  },

  divider: {
    width: '40px',
    height: '3px',
    background: '#e50914',
    margin: '10px auto',
  },

  subtitle: {
    color: '#aaa',
    fontSize: '0.85rem',
  },

  input: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    border: '1px solid #333',
    color: '#fff',
    height: '50px',
  },

  iconBox: {
    backgroundColor: 'transparent',
    border: '1px solid #444',
    color: '#aaa',
  },

  button: {
    background: 'linear-gradient(90deg,#e50914,#ff3b30)',
    border: 'none',
    fontWeight: '700',
    height: '50px',
    borderRadius: '10px',
  },

  error: {
    color: '#ff6b6b',
    fontSize: '0.8rem',
  },
}

export default Login
