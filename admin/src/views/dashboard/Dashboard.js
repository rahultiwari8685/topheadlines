import React from 'react'
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CProgress,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilPeople,
  cilUser,
  cilUserX,
  cilMoney,
} from '@coreui/icons'

const Dashboard = () => {
  const stats = [
    {
      title: 'Total News',
      count: 60,
      goal: 100,
      icon: cilPeople,
      gradient: 'linear-gradient(135deg, #0d6efd 0%, #67b0fd 100%)',
    },
    {
      title: 'Draft News',
      count: 25,
      goal: 50,
      icon: cilUser,
      gradient: 'linear-gradient(135deg, #dc3545 0%, #ff6b81 100%)',
    },
    {
      title: 'Category',
      count: 40,
      goal: 40,
      icon: cilUserX,
      gradient: 'linear-gradient(135deg, #198754 0%, #66d9a4 100%)',
    },
    {
      title: 'Deleted News',
      count: 15,
      goal: 30,
      icon: cilMoney,
      gradient: 'linear-gradient(135deg, #fd7e14 0%, #ffae52 100%)',
    },
  ]

  return (
    <div className="p-4">
      <CRow className="g-4">
        {stats.map((item, index) => {
          const progress = Math.min((item.count / item.goal) * 100, 100)
          return (
            <CCol md={6} lg={3} sm={12} key={index}>
              <CCard
                className="text-white shadow border-0 h-100"
                style={{
                  background: item.gradient,
                  borderRadius: '1rem',
                }}
              >
                <CCardBody className="d-flex flex-column justify-content-between p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="icon-wrapper bg-white text-primary d-flex align-items-center justify-content-center rounded-circle me-3" style={{ width: '50px', height: '50px' }}>
                      <CIcon icon={item.icon} size="lg" />
                    </div>
                    <div>
                      <h5 className="fw-bold mb-1">{item.title}</h5>
                      <small>{item.count} of {item.goal}</small>
                    </div>
                  </div>
                  <CProgress
                    value={progress}
                    className="progress-md rounded-pill"
                    style={{ height: '8px', backgroundColor: 'rgba(255,255,255,0.3)' }}
                  />
                </CCardBody>
              </CCard>
            </CCol>
          )
        })}
      </CRow>
    </div>
  )
}

export default Dashboard
