import './Navbar.css'
import { useGlobalContext } from '../../GlobalContext/GlobalContext'
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


export default function Navbar()
{
  const {Logout} = useGlobalContext();

  const handleLogout = () => {
    Logout(() => {
      <Navigate to="/login" />
    });
  };
    return(
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark" style={{padding: "0.5rem"}}>
  <a class="navbar-brand" href="/">Finance Management</a>
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <Link class="nav-link active" to="/">Home <span class="sr-only">(current)</span></Link>
      </li>
      <li class="nav-item ">
        <Link class="nav-link " to="/login">Login</Link>
      </li>
      <li class="nav-item ">
        <Link class="nav-link " to="/signup">Sign Up</Link>
      </li>
      <li class="nav-item">
        <button class="nav-link " onClick={handleLogout}>Logout</button>
      </li>
    </ul>
  </div>
</nav>
    )
}


