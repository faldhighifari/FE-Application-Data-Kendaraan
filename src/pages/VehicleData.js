import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useQuery, useMutation } from 'react-query';
import axios from 'axios';

import imgIcon from '../assets/Files.jpg';
import DeleteData from '../components/modal/DeleteData';


import { API } from '../config/api';
import { API2 } from '../config/api2';
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

    const [q, setQ] = useState("");
    const [searchTerm] = useState(["nomor_registrasi_kendaraan", "nama_pemilik"]);

    const [APIData, setAPIData] = useState([])

    let { data: vehicles, refetch } = useQuery('vehiclesCache', async () => {
        const response = await API2.get('/vehicles');
        // console.log(response);
        setAPIData(vehicles);
        // console.log(APIData);
        return response.data;
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


      const handleDetail = (id) => {
        navigate(`/detail-vehicle/${id}`);
      };

      function search(datas) {
        return datas.filter((data) => {
            return searchTerm.some((newData) => {
                return (
                    data[newData]
                        .toString()
                        .toLowerCase()
                        .indexOf(q.toLowerCase()) > -1
                );
            });
        });
      }

    const [data ,setData] = useState([]);
    const [filtered ,setFilterd] = useState([]);
    const [result , setResult] = useState("");
    const [resultname , setResultname] = useState("");

    useEffect(()=>{
            const fetchData = async ()=> {
                    try{
                        const res = await axios.get('http://localhost:8080/api/vehicles');
                        setData(res.data);
                        console.log(res)
                        setFilterd(res.data);
                    }catch(err){
                        throw new Error(err);
                    }
                     };
                  fetchData(); 
        },[]);

        useEffect(()=> {
            const results = filtered.filter(res=> res.nomor_registrasi_kendaraan.toLowerCase().includes(result.toLowerCase())

            ); 
            setData(results)
        } ,[result])
        
        useEffect(()=> {
          const resultnames = filtered.filter(res=> res.nama_pemilik.toLowerCase().includes(resultname.toLowerCase())

          ); 
          setData(resultnames)
      } ,[resultname])

      const onChange =(e)=> {
            setResult(e.target.value);
        }

        const onChangeName =(e)=> {
          setResultname(e.target.value);
      }

      

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
            {/* <input
                    // type="search"
                    type="text"
                    // id="nomor_registrasi_kendaraan"
                    // name="nomor_registrasi_kendaraan"
                    // placeholder="no registrasi"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                /> */}

        <input 
            type="text"
            placeholder="search here .."
            value={result}
            onChange={onChange}
        />
              <div>
                <label for="upload" className="mt-4">
                <b>
                    Nama Pemilik</b>
                </label>
              </div>
              <input 
            type="text"
            placeholder="search here .."
            value={resultname}
            onChange={onChangeName}
        />

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
        {data?.length !== 0 ? (
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
              {data?.map((item, index) => (
                <tr key={index}>
                  <td width="10%" className="align-middle">
                    {index + 1}
                  </td>
                  <td width="60%" className="align-middle">
                    {item?.nomor_registrasi_kendaraan}
                  </td>
                  <td width="60%" className="align-middle">
                    {item?.nama_pemilik}
                  </td>
                  <td width="60%" className="align-middle">
                    {item?.merk_kendaraan}
                  </td>
                  <td width="60%" className="align-middle">
                    {item?.tahun_pembuatan}
                  </td>
                  <td width="60%" className="align-middle">
                    {item?.kapasitas_silinder}
                  </td>
                  <td width="60%" className="align-middle">
                    {item?.warna_kendaraan}
                  </td>
                  <td width="60%" className="align-middle">
                    {item?.bahan_bakar}
                  </td>
                  <td width="30%">
                
                    <Button
                      onClick={() => {
                        handleEdit(item?.nomor_registrasi_kendaraan);
                      }}
                      className="btn-sm btn-success me-2"
                      style={{ width: '135px' }}
                    >
                      Edit
                    </Button>

                    <Button
                      onClick={() => {
                        handleDetail(item?.nomor_registrasi_kendaraan);
                      }}
                      className="btn-sm btn-warning me-2"
                      style={{ width: '135px' }}
                    >
                      Detail
                    </Button>

                    <Button
                      onClick={() => {
                        handleDelete(item?.nomor_registrasi_kendaraan);
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
