import { useEffect, useState } from "react";

import FormProduct from "../../components/FormProduct";
import Header from "../../components/Header";

function Product() {
  const [isModal, setIsModal] = useState(false);
  const [localProducts, setLocalProducts] = useState([]);

  function handleModal() {
    !isModal ? setIsModal(true) : setIsModal(false);
  }

  function setProductFromLocalStorage(data) {
    setLocalProducts((prev) => [...prev, data]);
  }

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem("products"));
    if (products !== null) setLocalProducts(products);
  }, []);

  return (
    <>
      <Header />
      <div className="main">
        <h2>Registro de produtos</h2>

        {isModal ? (
          <FormProduct
            setProductData={setProductFromLocalStorage}
            handleModalFromForm={handleModal}
          />
        ) : (
          ""
        )}

        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Categoria</th>
              <th>SKU</th>
              <th>Preço</th>
              <th>Quantidade</th>
            </tr>
          </thead>
          <tbody>
            {localProducts?.map((product) => (
              <tr key={product.sku}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.category}</td>
                <td>{product.sku}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="add" onClick={handleModal}>
          Adicionar produto
        </button>
      </div>
    </>
  );
}

export default Product;
