import { useEffect, useState } from "react";

import Header from "../../components/Header";
import FormClient from "../../components/FormClient";

function Client() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [localUsers, setLocalUsers] = useState([]);

  function handleModal() {
    isModalOpen ? setIsModalOpen(false) : setIsModalOpen(true);
  }

  function setDataFromLocalStorage(data) {
    setLocalUsers((prev) => [...prev, data]);
  }

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users"));
    if (users !== null) setLocalUsers(users);
  }, []);

  return (
    <>
      <Header />
      <div className="main">
        <h2>Registro de clientes</h2>
        
        {isModalOpen ? (
          <FormClient
            setData={setDataFromLocalStorage}
            handleModalFromForm={handleModal}
          />
        ) : (
          ""
        )}
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>CPF</th>
              <th>CEP</th>
              <th>Logradouro</th>
              <th>Número</th>
              <th>Bairro</th>
              <th>Cidade</th>
              <th>Estado</th>
            </tr>
          </thead>

          <tbody>
            {localUsers?.map((data) => (
              <tr key={`${data.name}-${data.email}`}>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.phone}</td>
                <td>{data.cpf}</td>
                <td>{data.cep}</td>
                <td>{data.street}</td>
                <td>{data.number}</td>
                <td>{data.district}</td>
                <td>{data.city}</td>
                <td>{data.uf}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="add" onClick={handleModal}>
          Adicionar cliente
        </button>
      </div>
    </>
  );
}

export default Client;
