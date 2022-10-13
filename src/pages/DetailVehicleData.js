import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router';
import { useQuery, useMutation } from 'react-query';

import imgIcon from '../assets/Files.jpg';


import { API } from '../config/api';
let api = API();


export default function DetailVehicleData() {


    const title = 'Detail Vehicle Data ';
    document.title = title;

    let navigate = useNavigate();

    const backVehicle = () => {
        navigate('/');
      }

    const { id } = useParams();

    const [vehicle, setVehicle] = useState({});

    const [form, setForm] = useState({
        nomor_registrasi_kendaraan: "",
        nama_pemilik: "",
        merk_kendaraan: "",
        alamat: "",
        tahun_pembuatan: "",
        kapasitas_silinder:"",
        warna_kendaraan:"",
        bahan_bakar:"",
    });

    let { vehicleRefetch } = useQuery("vehicleCache", async () => {
        const config = {
            headers: {
              Authorization: "Basic " + localStorage.token,
            },
          };
        const response = await api.get("/vehicles/" + id, config);

        setForm({
          ...form,
          nomor_registrasi_kendaraan: response.nomor_registrasi_kendaraan,
          nama_pemilik: response.nama_pemilik,
          merk_kendaraan: response.merk_kendaraan,
          alamat: response.alamat,
          tahun_pembuatan: response.tahun_pembuatan,
          kapasitas_silinder: response.kapasitas_silinder,
          warna_kendaraan: response.warna_kendaraan,
          bahan_bakar: response.bahan_bakar,
        });
        setVehicle(response);
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
        <p >Edit Data Kendaraan</p>
    </Container>

    <Container>
    <div className="py-3 px-3 rounded" style={{  width: '100%' ,backgroundColor: '#02F1FA'}}>
        <div>
                        <label for="upload" className="my-1">
                            <b>
                            No Registrasi Kendaraan</b>
                        </label>
        </div>
            <div>{form.nomor_registrasi_kendaraan}</div>
        <div>
                        <label for="upload" className="my-1">
                            <b>
                            Nama Pemilik</b>
                        </label>
        </div>
            <div>{form.nama_pemilik}</div>
        <div>
                        <label for="upload" className="my-1">
                            <b>
                            Merk Kendaraan</b>
                        </label>
        </div>
            <div>{form.merk_kendaraan}</div>
        <div>
                        <label for="upload" className="my-1">
                            <b>
                            alamat</b>
                        </label>
        </div>
            <div>{form.alamat}</div>
        <div>
                        <label for="upload" className="my-1">
                            <b>
                            Tahun Pembuatan</b>
                        </label>
        </div>
        
            <div>{form.tahun_pembuatan}</div>
        <div>
                        <label for="upload" className="my-1">
                            <b>
                            Kapasitas Silinder</b>
                        </label>
        </div>
            <div>{form.kapasitas_silinder}</div>
        <div>
                        <label for="upload" className="my-1">
                            <b>
                            Warna Kendaraan</b>
                        </label>
        </div>
            <div>{form.warna_kendaraan}</div>
        <div>
                        <label for="upload" className="my-1">
                            <b>
                            Bahan Bakar</b>
                        </label>
        </div>
            <div>{form.bahan_bakar}</div>

        <Button onClick={backVehicle} variant="secondary" size="md" style={{ width: '100px' }}>
                  Kembali
        </Button>
            
    </div>
    </Container>
    </>
  )
}
