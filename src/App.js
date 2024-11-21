// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import FormBuilder from './Components/Form/FormBuilder';
// import FormPreview from './Components/Form/FormPreview';
// import Mainpage from './Components/MainPage/Mainpage';
// import Navbar from './Components/Navbar/Navbar';

// function App() {
//   return (
   
//       <div className="App">
//         <Routes>
         
//           <Route path="/" element={<Mainpage />} />
//             <Route path="/navbar" element={<Navbar />} />
//           <Route path="/form-builder" element={<FormBuilder />} />
//           <Route path="/form-preview" element={<FormPreview />} />
//         </Routes>
//       </div>
   
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FormBuilder from './Components/Form/FormBuilder';
import FormPreview from './Components/Form/FormPreview';
import Mainpage from './Components/MainPage/Mainpage';
import Navbar from './Components/Navbar/Navbar';
import Header from './Components/Header/Header';
import FormPage from './Components/FormPage/Formpage';
import Layout from './Components/Layout/Layout';
import SignInSignUp from './Components/LoginPage/Login';
import Surveyor from './Components/Surveyor/Surveyor';
import Dashboard from './Components/Dashboard/Dashboard';
import Responses from './Components/Responses/Responses';
import FormDetails from './Components/Responses/Responsedetail';

function App() {
  return (
    <div className="App">
     
        <Routes>
        <Route exact path='/login' element={ <SignInSignUp/>} />
          <Route path="/" element={<Mainpage />} />
          {/* <Route path="/layout" element={<Layout/>} /> */}
          <Route path="/dashboard" element={<Layout><Dashboard/></Layout>} />
          <Route path="/createform" element={<Layout><FormPage /></Layout>} />
          <Route path="/surveyor" element={<Layout><Surveyor/></Layout>} />
          <Route path="/responses" element={<Layout><Responses/></Layout>} />
          <Route path="/form-details" element={<Layout><FormDetails/></Layout>} />
          <Route path="/form-builder" element={<Layout><FormBuilder /></Layout>} />
          <Route path="/form-preview" element={<FormPreview />} />
        </Routes>
      
    </div>
  );
}

export default App;

