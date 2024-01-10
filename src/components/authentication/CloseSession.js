import { useNavigate } from 'react-router-dom';
//import Login from './Login';
const CloseSession = () => {
    const navigate = useNavigate();

const handleCloseSession = () => {
    localStorage.setItem('isRegister', 'false');
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.setItem('idPerfil', '0');
    console.log("Cerre Session");
    navigate("/Login");
    window.location.reload();
  };
  handleCloseSession();
  return null;
};
export default CloseSession;