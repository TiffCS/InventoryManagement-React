import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import axios from 'axios';
import { API_BASE_URL } from '../../apiConfig';

function SupplierDetails() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [activeTab, setActiveTab] = useState(0);
    const navigate = useNavigate();

    const handleTabSelect = (index) => {
        setActiveTab(index);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Fetching supplier details...');
                const response = await axios.get(`${API_BASE_URL}Suppliers/${id}`);
                console.log('Response:', response.data);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching supplier details:', error);
                navigate('/supplier'); // Redirect to supplier page if error occurs
            }
        };

        fetchData();
    }, [id, navigate]);

    console.log('Data:', data);

    if (!data) return null;

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="bg-light shadow-sm rounded-2 p-4">
                        <div className="d-flex flex-column gap-2 fs-5">
                            <div className="fw-semibold fs-2">{data.name}</div>
                            <Tabs className="mt-4" selectedIndex={activeTab} onSelect={handleTabSelect}>
                                <TabList className="nav nav-tabs">
                                    <Tab className="nav-item cursor-pointer btn-outline-info">
                                        <div className={`nav-link ${activeTab === 0 ? 'active' : ''}`}>Email</div>
                                    </Tab>
                                    <Tab className="nav-item cursor-pointer btn-outline-info">
                                        <div className={`nav-link ${activeTab === 1 ? 'active' : ''}`}>Map</div>
                                    </Tab>
                                </TabList>
                                <TabPanel>
                                    <div className="mt-3">{data.email}</div>
                                </TabPanel>
                                <TabPanel>
                                    <div className="mt-3">
                                        <div className="rounded-2 overflow-hidden">
                                            <div className="gmap_canvas">
                                                <iframe width="100%" height="320" id="gmap_canvas" src={`https://maps.google.com/maps?q=${data.address}&t=&z=13&ie=UTF8&iwloc=&output=embed`} frameborder="0" scrolling="no" marginheight="0" marginwidth="0" name={data.name}></iframe>
                                            </div>
                                        </div>
                                    </div>
                                </TabPanel>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SupplierDetails;
