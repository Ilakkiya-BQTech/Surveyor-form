import React from 'react';
import Folder from '../../Assets/folder.png';
import Gismap from '../../Assets/gis.png';
import Surveyform from '../../Assets/online-survey.png';
import Surveyor from '../../Assets/surveyor.png';
import '../../Styles/mainpage.css';
import { useNavigate } from 'react-router-dom';
const Mainpage = () => {
    const navigate = useNavigate();
    return (
        <div className="main-container" onClick={() => navigate('/createform')}>
            <div className="image-container">

                
                <div className="image-row">
                    <div className="content">
                        <div className="image-item">
                            <img src={Surveyform} alt="Surveyform" />
                        </div>
                        <div className="label-item">Surveyform</div>
                    </div>
                    <div className="content">
                        <div className="image-item">
                            <img src={Surveyor} alt="Surveyor" />
                        </div>
                        <div className="label-item">Surveyor</div>
                    </div>
                    <div className="content">
                        <div className="image-item">
                            <img src={Gismap} alt="Gismap" />
                        </div>
                        <div className="label-item">Gismap</div>
                    </div>

                    <div className="content">
                        <div className="image-item">
                            <img src={Folder} alt="folder" />
                        </div>
                        <div className="label-item">folder</div>
                    </div>

                </div>

               
                <div className="image-row">
                    <div className="content">
                        <div className="image-item">
                            <img src={Folder} alt="folder" />
                        </div>
                        <div className="label-item">folder</div>
                    </div>

                    <div className="content">
                        <div className="image-item">
                            <img src={Surveyform} alt="Surveyform" />
                        </div>
                        <div className="label-item">Surveyform</div>
                    </div>
                    <div className="content">
                        <div className="image-item">
                            <img src={Surveyor} alt="Surveyor" />
                        </div>
                        <div className="label-item">Surveyor</div>
                    </div>
                    <div className="content">
                        <div className="image-item">
                            <img src={Gismap} alt="Gismap" />
                        </div>
                        <div className="label-item">Gismap</div>
                    </div>
                </div>

                
                <div className="image-row">
                    <div className="content">
                        <div className="image-item">
                            <img src={Surveyor} alt="Surveyor" />
                        </div>
                        <div className="label-item">Surveyor</div>
                    </div>
                    <div className="content">
                        <div className="image-item">
                            <img src={Folder} alt="folder" />
                        </div>
                        <div className="label-item">folder</div>
                    </div>
                    <div className="content">
                        <div className="image-item">
                            <img src={Gismap} alt="Gismap" />
                        </div>
                        <div className="label-item">Gismap</div>
                    </div>
                    <div className="content">
                        <div className="image-item">
                            <img src={Surveyform} alt="Surveyform" />
                        </div>
                        <div className="label-item">Surveyform</div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Mainpage;
