import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <nav>
        <Link to="/" className="cta">Produtos</Link>
        <Link to="./client" className="cta">Clientes</Link>          
      </nav>
    </header>
  );
}

export default Header;
