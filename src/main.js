import React, { useEffect } from 'react';
import './style.css';
import { MongoClient } from 'mongodb';
import imageone from './1000032575 (1).png';

const Main = () => {
    useEffect(() => {
        const getData = async () => {
            const uri = 'mongodb+srv://prathamkandari123:<password@cluster0.g6au8si.mongodb.net/';

            const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

            try {
                await client.connect();
                const database = client.db('ByTive');
                const collection = database.collection('DatabaseBackend');

                const result = await collection.find({}).toArray();
                console.log('Fetched Data:', result);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                await client.close();
            }
        };

        getData();
    }, []);
    return (
        <div>
            {/* Header */}
            <div className="header">
                {/* Home Logo Link */}
                <div className="home-logo">
                    <a href="/organization-link">Home Logo Link</a>
                </div>

                {/* Buttons on the right side */}
                <div className="header-buttons">
                    <button>Browse Students</button>
                    <button>Edit Profile</button>
                    <button>Log out</button>
                </div>
            </div>

            {/* Next Row with Dropdowns, Input, and Button */}
            <div className="next-row" style={{ padding: '20px' }}>
                {/* Dropdowns */}
                <div className="dropdown">
                    <label htmlFor="fieldOfInterest">Field of Interest:</label>
                    <select id="fieldOfInterest">
                        <option value="AI">AI</option>
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        {/* Add more options as needed */}
                    </select>
                </div>

                <div className="dropdown">
                    <label htmlFor="techStack">Tech Stack:</label>
                    <select id="techStack">
                        <option value="HTML">HTML</option>
                        <option value="CSS">CSS</option>
                        <option value="JavaScript">JavaScript</option>
                        {/* Add more options as needed */}
                    </select>
                </div>

                {/* Input Field and Search Button */}
                <div className="keyword-search" style={{ marginLeft: "15%" }}>
                    <label htmlFor="keyword">Keyword Search:</label>
                    <input type="text" id="keyword" />
                    <button>Search</button>
                </div>
            </div>

            {/* User Information Section */}
            <div className="user-section" style={{ border: '1px solid' }}>
                <div className="user-details">
                    <img src={imageone} alt="User" style={{ width: '8%' }} />
                    <div className="user-info">
                        <div>
                            <h3>John Doe</h3>
                            <p>Front End Web Developer</p>
                            <p>Tech Stack: JavaScript, HTML5, CSS3</p>
                        </div>

                        {/* Buttons on the right side of user details */}
                        <div className="user-buttons">
                            <button>Delete</button>
                            <button>DM Student</button>
                            <button>View Profile</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* 2nd */}
            <div className="user-section" style={{ border: '1px solid' }}>
                <div className="user-details">
                    <img src={imageone} alt="User" style={{ width: '8%' }} />
                    <div className="user-info">
                        <div>
                            <h3>John Doe</h3>
                            <p>Front End Web Developer</p>
                            <p>Tech Stack: JavaScript, HTML5, CSS3</p>
                        </div>

                        {/* Buttons on the right side of user details */}
                        <div className="user-buttons">
                            <button>Delete</button>
                            <button>DM Student</button>
                            <button>View Profile</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* 3rd */}
            <div className="user-section" style={{ border: '1px solid' }}>
                <div className="user-details">
                    <img src={imageone} alt="User" style={{ width: '8%' }} />
                    <div className="user-info">
                        <div>
                            <h3>John Doe</h3>
                            <p>Front End Web Developer</p>
                            <p>Tech Stack: JavaScript, HTML5, CSS3</p>
                        </div>

                        {/* Buttons on the right side of user details */}
                        <div className="user-buttons">
                            <button>Delete</button>
                            <button>DM Student</button>
                            <button>View Profile</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
