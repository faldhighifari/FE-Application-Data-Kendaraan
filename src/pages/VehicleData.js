import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useQuery, useMutation } from 'react-query';

import imgIcon from '../assets/Files.jpg';
import DeleteData from '../components/modal/DeleteData';


import { API } from '../config/api';
let api = API();

export default function VehicleData() {

    const title = 'Vehicle Data';
    document.title = title;

    let navigate = useNavigate();

    // Variabel for delete category data
    const [idDelete, setIdDelete] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);

    // Modal Confirm delete data
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let { data: vehicles, refetch } = useQuery('vehiclesCache', async () => {
        const response = await api.get('/vehicles');
        console.log(response);
        return response;
      });

      const addVehicle = () => {
        navigate('/add-vehicle');
      };

      // For get id category & show modal confirm delete data
        const handleDelete = (id) => {
            setIdDelete(id);
            handleShow();
        };

        // If confirm is true, execute delete data
        const deleteById = useMutation(async (id) => {
            try {
            const config = {
                    method: "DELETE",
            }
            await api.delete("/vehicles/" + id, config);
            // console.log(await api.delete(`/products/${id}`,config));
            refetch();
            } catch (error) {
            console.log(error);
            }
        });

        useEffect(() => {
            if (confirmDelete) {
            // Close modal confirm delete data
            handleClose();
            // execute delete data by id function
            deleteById.mutate(idDelete);
            setConfirmDelete(null);
            }
        }, [confirmDelete]);

      const handleEdit = (id) => {
        navigate(`/update-vehicle/${id}`);
      };

      

  return (
    <>
    <Container className="py-2 px-5">
        <img
            src={imgIcon}
            className="img-fluid"
            style={{ width: '4%' , float: 'left'}}
            alt="empty"
        />
        <h3 style={{ position: 'relative'}}> Aplikasi Data Kendaraan</h3>
    </Container>

    <Container >

        <div style={{  width: '100%' ,backgroundColor: '#ff9caf'}}>

            <form className="py-3 px-3">
              <div>
                <label for="upload" className="my-1">
                    <b>
                    No Registrasi</b>
                </label>
            </div>
              <input/>

              <div>
                <label for="upload" className="mt-4">
                <b>
                    Nama Pemilik</b>
                </label>
              </div>
              <input/>

              <div className="mt-4">                
                <Button type="submit" variant="primary" size="md" style={{ width: '100px' }}>
                  Search
                </Button>
              </div>
              
            </form>

        </div>

    </Container>
    
    <Container className="py-5">
    <Row>
      <Col>
        <div className="text-header-category mb-4">List Vehicle</div>
      </Col>
      <Col className="text-end">
      {/* <Button
          onClick={addCategory}
          className="btn-primary mx-1"
          style={{ width: '100px' }}
        >
          Search
        </Button> */}
        <Button
          onClick={addVehicle}
          className="btn-primary"
          style={{ width: '100px' }}
        >
          Add
        </Button>
      </Col>
      <Col xs="12">
        {vehicles?.length !== 0 ? (
          <Table bordered hover size="lg">
            <thead style={{ backgroundColor: '#469ae3'}}>
              <tr>
                <th className="align-middle" style={{textAlign: 'center' }}>No</th>
                <th className="align-middle" style={{textAlign: 'center' }}>No Registrasi</th>
                <th className="align-middle" style={{textAlign: 'center' }}>Nama Pemilik</th>
                <th className="align-middle" style={{textAlign: 'center' }}>Merk Kendaraan</th>
                <th className="align-middle" style={{textAlign: 'center' }}>Tahun Pembuatan</th>
                <th className="align-middle" style={{textAlign: 'center' }}>Kapasitas</th>
                <th className="align-middle" style={{textAlign: 'center' }}>Warna</th>
                <th className="align-middle" style={{textAlign: 'center' }}>Bahan Bakar</th>
                <th className="align-middle" style={{textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {vehicles?.map((item, index) => (
                <tr key={index}>
                  <td width="10%" className="align-middle">
                    {index + 1}
                  </td>
                  <td width="60%" className="align-middle">
                    {item.nomor_registrasi_kendaraan}
                  </td>
                  <td width="60%" className="align-middle">
                    {item.nama_pemilik}
                  </td>
                  <td width="60%" className="align-middle">
                    {item.merk_kendaraan}
                  </td>
                  <td width="60%" className="align-middle">
                    {item.tahun_pembuatan}
                  </td>
                  <td width="60%" className="align-middle">
                    {item.kapasitas_silinder}
                  </td>
                  <td width="60%" className="align-middle">
                    {item.warna_kendaraan}
                  </td>
                  <td width="60%" className="align-middle">
                    {item.bahan_bakar}
                  </td>
                  <td width="30%">
                
                    <Button
                      onClick={() => {
                        handleEdit(item.nomor_registrasi_kendaraan);
                      }}
                      className="btn-sm btn-success me-2"
                      style={{ width: '135px' }}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => {
                        handleDelete(item.nomor_registrasi_kendaraan);
                      }}
                      className="btn-sm btn-danger"
                      style={{ width: '135px' }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <div className="text-center pt-5">
            <div className="mt-3">No Data</div>
          </div>
        )}
        
      </Col>
    </Row>
  </Container>

  <DeleteData
        setConfirmDelete={setConfirmDelete}
        show={show}
        handleClose={handleClose}
      />
  </>
  )
}
