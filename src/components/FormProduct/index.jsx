import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Informe o nome"),
  description: yup.string().required("Informe a descrição"),
  category: yup.string().required("Informe a categoria"),
  sku: yup.string(),
  price: yup
    .number()
    .typeError("Informe o preço com duas casas decimais separadas por ponto")
    .positive()
    .required("Informe o preço"),
  quantity: yup
    .number()
    .typeError("Informe a quantidade em forma numérica")
    .positive()
    .required("Informe a quantidade"),
});

function FormProduct(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function saveInLocalStorage(data) {
    const storageProducts = localStorage.getItem("products");

    if (!storageProducts) {
      const products = [data];
      localStorage.setItem("products", JSON.stringify(products));
      return;
    }

    const products = JSON.parse(storageProducts);
    products.push(data);
    localStorage.setItem("products", JSON.stringify(products));
  }

  function getLastProductFromLocalStorage() {
    const products = JSON.parse(localStorage.getItem("products"));
    const lastProduct = products[products.length - 1];
    return lastProduct;
  }

  function handleModal() {
    props.handleModalFromForm();
  }

  const onSubmit = (data) => {
    saveInLocalStorage(data);
    const product = getLastProductFromLocalStorage();
    props.setProductData(product);
    alert(`O produto '${product.name}' foi adicionado.`);
    handleModal();
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit(onSubmit)}>
        <span className="close" onClick={handleModal}>x</span>
        <div className="form-group">
          <input
            {...register("name")}
            type="text"
            name="name"
            id="input-product-name"
            title="Name"
            placeholder="Nome"
          />
          <p className="field-error">{errors.name?.message}</p>
        </div>

        <div className="form-group">
          <input
            {...register("description")}
            type="text"
            name="description"
            id="input-product-description"
            title="Description"
            placeholder="Descrição"
          />
          <p className="field-error">{errors.description?.message}</p>
        </div>

        <div className="form-group">
          <input
            {...register("category")}
            type="text"
            name="category"
            id="input-product-category"
            title="Category"
            placeholder="Categoria"
          />
          <p className="field-error">{errors.category?.message}</p>
        </div>

        <div className="form-group">
          <input
            {...register("sku")}
            type="text"
            name="sku"
            id="input-product-sku"
            title="SKU"
            placeholder="SKU"
          />
        </div>

        <div className="form-group">
          <input
            {...register("price")}
            type="number"
            name="price"
            id="input-product-price"
            title="Price"
            step="0.01"
            placeholder="Preço"
          />
          <p className="field-error">{errors.price?.message}</p>
        </div>

        <div className="form-group">
          <input
            {...register("quantity")}
            type="number"
            name="quantity"
            id="input-product-quantity"
            title="Quantity"
            placeholder="Quantidade"
          />
          <p className="field-error">{errors.quantity?.message}</p>
        </div>

        <button>Cadastrar</button>
      </form>
    </div>
  );
}

export default FormProduct;
