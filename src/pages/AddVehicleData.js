import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useQuery, useMutation } from 'react-query';

import imgIcon from '../assets/Files.jpg';


import { API } from '../config/api';
let api = API();

export default function AddVehicleData() {

    const title = 'Add Vehicle Data ';
    document.title = title;

    let navigate = useNavigate();

    const backVehicle = () => {
        navigate('/');
      };
    
    const [form, setForm] = useState({
        nomor_registrasi_kendaraan: "",
        nama_pemilik: "",
        merk_kendaraan: "",
        alamat: "",
        tahun_pembuatan: "",
        kapasitas_silinder:"",
        warna_kendaraan:"",
        bahan_bakar:""
      });

    const handleChange = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value,
        });
      };

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            const body = JSON.stringify(form);

            // Configuration
            const config = {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body,
            };
            console.log(config);
    
            // Insert category data
            const response = await api.post("/vehicles", config);
    
            console.log(response);
        
            alert("data berhasil tersimpan");
            navigate("/");

            } catch (error) {
            console.log(error);
            }
      });
    

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
        <p >Tambah Data Kendaraan</p>
    </Container>

    <Container >

        <div style={{  width: '100%' ,backgroundColor: '#ff9caf'}}>

            <form className="py-3 px-3" onSubmit={(e) => handleSubmit.mutate(e)}>
            <Row>
                <Col>
                    <div>
                        <label for="upload" className="my-1">
                            <b>
                            No Registrasi Kendaraan</b>
                        </label>
                    </div>
                    <input style={{ width: '400px' }}
                        type="text"
                        id="nomor_registrasi_kendaraan"
                        name="nomor_registrasi_kendaraan"
                        onChange={handleChange}
                        required
                    />

                    <div>
                        <label for="upload" className="mt-4">
                        <b>
                            Nama Pemilik</b>
                        </label>
                    </div>
                    <input style={{ width: '400px' }}
                        type="text"
                        id="nama_pemilik"
                        name="nama_pemilik"
                        onChange={handleChange}
                        required
                    />

                    <div>
                        <label for="upload" className="my-1">
                        <b>
                            Merk Kendaraan</b>
                        </label>
                    </div>
                    <input style={{ width: '400px' }}
                        type="text"
                        id="merk_kendaraan"
                        name="merk_kendaraan"
                        onChange={handleChange}
                        required/>

                    <div>
                        <label for="upload" className="mt-4">
                         <b>
                            Alamat Pemilik Kendaraan</b>
                        </label>
                    </div>
                    <textarea style={{ width: '400px' }}
                        id="alamat"
                        name="alamat"
                        onChange={handleChange}
                        required
                        ></textarea>
                </Col>

                <Col>
                    <div>
                        <label for="upload" className="my-1">
                            <b>
                            Tahun Pembuatan</b>
                        </label>
                    </div>
                    <input style={{ width: '400px' }}
                        type="number"
                        id="tahun_pembuatan"
                        name="tahun_pembuatan"
                        onChange={handleChange}
                        maxLength={4}
                        required
                        />

                    <div>
                        <label for="upload" className="mt-4">
                        <b>Kapasitas Silinder</b>
                        </label>
                    </div>
                    <input style={{ width: '400px' }}
                        type="number"
                        id="kapasitas_silinder"
                        name="kapasitas_silinder"
                        onChange={handleChange}
                        required
                      />

                    <div>
                        <label for="upload" className="my-1">
                            <b>
                            Warna Kendaraan</b>
                        </label>
                    </div>
                    <select
                      className="form-select"
                      name="warna_kendaraan"
                      id="warna_kendaraan"
                      onChange={handleChange}
                      required
                    >
                      <option disabled>Pilih Warna Kendaraan</option>
                      <option value="Merah">Merah</option>
                      <option value="Hitam">Hitam</option>
                      <option value="Biru">Biru</option>
                      <option value="Abu-abu">Abu-abu</option>
                    </select>

                    <div>
                        <label for="upload" className="mt-4">
                        <b>
                            Bahan Bakar</b>
                        </label>
                    </div>
                    <input style={{ width: '400px' }}
                        type="text"
                        id="bahan_bakar"
                        name="bahan_bakar"
                        onChange={handleChange}
                        required
                      />
                </Col>
                <Col></Col>
            </Row>
              


              <div className="mt-4">                
                <Button type="submit" className="mx-2" variant="primary" size="md" style={{ width: '100px' }}>
                 Simpan
                </Button>
                <Button onClick={backVehicle} variant="secondary" size="md" style={{ width: '100px' }}>
                  Kembali
                </Button>
              </div>
              
            </form>

        </div>

    </Container>
    
    
    </>
  )
}
