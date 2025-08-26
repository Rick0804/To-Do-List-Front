import "./header.css";
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const getTitle = () => {
    switch (location.pathname){
      case '/': return "Página Inicial";
      break;
      case '/metas': return "Página de Metas";
      break;
      case '/notes': return "Página de Notas";
      break;
    }
  }
  return (
   <header>
      <div className="title">
        <h1>To-Do List</h1>
      </div>
      <div className="name-page">
        <h3>{getTitle()}</h3>
      </div>
   </header>
  )
};

export default Header;