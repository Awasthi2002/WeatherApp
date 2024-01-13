import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GoSearch } from 'react-icons/go';
import { GoLocation } from 'react-icons/go';
import { AiOutlineCloud } from 'react-icons/ai';
import { BsFillCloudsFill, BsCloudsFill, BsCloudSun, BsSun } from 'react-icons/bs';
import { TiWeatherShower, TiWeatherDownpour } from 'react-icons/ti';
import pic from '../images/w.png';
function Index() {
    const [data, setdata] = useState({});
    const [temp, settemp] = useState({});
    const [feel, setfeel] = useState([]);
    const [city, setcity] = useState("delhi")
    const fetch = () => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f0ed8bbd9145f45390a91be26b180d0f`).then((res) => {
            setdata(res.data);
            settemp(res.data.main);
            setfeel(res.data.weather);
        })
    }

    console.log(data)

    const fetch2 = () => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f0ed8bbd9145f45390a91be26b180d0f`).then((res) => {
            setdata(res.data);
            settemp(res.data.main);
            setfeel(res.data.weather);
            console.log(data)
        })
    }

    const handleChange = (e) => {
        setcity(e.target.value)
    }

    const handlekey = (e) => {
        if (e.key === 'Enter') {
            fetch2()
        }
    }

    const handleSubmit = () => {
        fetch2()
    }
    useEffect(() => {
        fetch()
    }, [])
    return (
        <div className='container mt-5'>
            <h1 className='text-light'><span className='check'>Check Live Weather of Your Town</span></h1>
            <hr></hr>

            <div className='row'>
                <div className='col-md-4'>
                    <h3 className='text-light'>Weather App</h3>
                    <div className='mt-5 box-shadow-1'>
                        <img src={pic} className='img-fluid' />
                    </div>

                </div>
                <div className='col-md-8'>
                    <div className='d-flex align-items-center'>
                        <input className='form-control' placeholder='search by city' value={city} onChange={handleChange} onKeyPress={handlekey} /><GoSearch className='icosn' onClick={handleSubmit} />
                    </div>


                    <div className='mt-5 box-shadow'>
                        <div className='d-flex justify-content-center align-items-center'>
                            <GoLocation />
                            <h4>{data.name}</h4>
                        </div>

                        <div className='text-center'>
                            <h1>{Math.floor(temp.temp / 10)}<sup>o</sup>c</h1>

                            {feel.map((e) => {
                                return (
                                    <div className='d-flex justify-content-center align-items-center'>
                                        <h5>{e.description}</h5>
                                        {e.description === "overcast clouds" ? <BsCloudsFill className='icons' /> : e.description === "scattered clouds" ? <BsFillCloudsFill className='icons' /> : e.description === "mist" ? <TiWeatherShower className='icons' /> : e.description === "broken clouds" ? <AiOutlineCloud className='icons' /> : e.description === 'few clouds' ? <BsCloudSun className="icons" /> : e.description === "clear sky" ? <BsSun className='icons' /> : <TiWeatherDownpour className='icons' />}

                                    </div>)
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Index