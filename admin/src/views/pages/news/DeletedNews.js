import React, { useEffect, useState } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CFormInput,
    CFormLabel,
    CForm,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CButton
} from '@coreui/react'
import { cilTrash, cilPencil } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import secureLocalStorage from "react-secure-storage";
import setting from '../../../setting.json'
const DeletedNews = () => {
    const [newsList, setNewsList] = useState([]);


    const fetchNews = async () => {
        try {
            const token = JSON.parse(secureLocalStorage.getItem("logininfo")).token;

            const res = await fetch(setting.api + "/api/news/deleteNews", {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + token,
                },
            });

            const data = await res.json();
            setNewsList(data.news || []);
        } catch (error) {
            console.error("Error fetching news:", error);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    function handleDelete(id) {
        var ans = confirm("Are you sure For Delete?");
        console.log(ans);

        if (ans == true) {
            deleteUser(id);
        }

    }

    const deleteUser = async (id) => {
        try {
            const token = JSON.parse(secureLocalStorage.getItem("logininfo"))?.token;

            const response = await fetch(`${setting.api}/api/news/delete/${id}`, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                console.error("Delete failed:", response.status);
            } else {
                console.log("User deleted:", await response.json());
                getAllCategory();
            }
        } catch (err) {
            console.error("Error deleting user:", err);
        }
    };

    return (
        <CCard className="shadow-sm border-0 rounded-4">

            <CCardHeader className="bg-dark text-white fw-bold px-4 py-3 shadow-sm">
                <div className="d-flex justify-content-between align-items-center">

                    <h5 className="mb-0">
                        <i className="bi bi-trash-fill me-2 text-danger"></i> Deleted Video
                    </h5>
                </div>
            </CCardHeader>



            <CCardBody>
                <CForm className="mb-4">
                    <CRow className="g-3">

                        <CCol md={12}>
                            <CFormLabel htmlFor="searchText">Search Text</CFormLabel>
                            <CFormInput type="text" id="searchText" placeholder="Search by Title" />
                        </CCol>
                    </CRow>
                </CForm>

                <CTable align="middle" hover responsive bordered>
                    <CTableHead color="light">
                        <CTableRow>
                            <CTableHeaderCell scope="col">#</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Slug</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {newsList && newsList.map((news, index) => (

                            <CTableRow key={index}>
                                <CTableDataCell>{index + 1}</CTableDataCell>
                                <CTableDataCell>{news.title}</CTableDataCell>
                                <CTableDataCell>{news.slug}</CTableDataCell>
                            </CTableRow>

                        ))}

                    </CTableBody>
                </CTable>
            </CCardBody>
        </CCard>
    )
}

export default DeletedNews
