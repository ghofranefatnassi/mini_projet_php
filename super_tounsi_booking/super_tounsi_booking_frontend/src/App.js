import React from "react";
import {Route, Routes ,BrowserRouter as Router } from 'react-router-dom';
import Login from "./pages/login/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Home from "./components/admin/Home";
import ListeEmployee from "./components/admin/ListeEmployee";
import ListTechnicians from "./components/admin/ListTechnicians";
import DashboardAdmin from "./components/admin/DashboardAdmin";
//import PrivateRoute from "./components/PrivateRoute";
import Reports from "./components/admin/Reports";
import DashboardEmp from "./components/employee/DashboardEmp";
import Service from "./components/employee/Service";
import ReportsEmp  from "./components/employee/ReportsEmp";
import Signup from "./components/LoginForm/Signup";
import Protected from "./components/Protected";
import Settings from "./components/Settings";
import SettingsEmp from "./components/employee/SettingsEmp";
import Mail from "./components/Mail";
import MailEmp from "./components/employee/MailEmp";
function App() {
  return (
    <>
  <Router>
        <Routes>
          <Route path='/'  element={<Login/>} />
          <Route path='/Signup'element={<Signup />}/>
          <Route path='/DashboardAdmin'  element={<Protected Cmp={DashboardAdmin}/> } />
          <Route path='/DashboardAdmin/ListeEmployee'element={<Protected Cmp={ListeEmployee}/>} />
          <Route path='/DashboardAdmin/ListTechnicians'element={<Protected Cmp={ListTechnicians}/>} />
          <Route path='/DashboardAdmin/Home'element={<Protected Cmp={Home}/>} />
          <Route path='/DashboardAdmin/Reports'element={<Protected Cmp={Reports}/>}/>
          <Route path='/DashboardEmp'element={<Protected Cmp={DashboardEmp }/>}/>
          <Route path='/DashboardEmp/ReporysEmp'element={<Protected Cmp={ReportsEmp }/>}/>
          <Route path='/Service'element={<Protected Cmp={Service }/>}/>
          <Route path='/SettingsEmp'element={<Protected Cmp={SettingsEmp }/>}/>
          <Route path='/Settings'element={<Protected Cmp={Settings }/>}/>
          <Route path='/Mail'element={<Protected Cmp={Mail }/>}/>
          <Route path='/MailEmp'element={<Protected Cmp={MailEmp }/>}/>
          
        </Routes>
  </Router>
    </>
  );
}

export default App;
