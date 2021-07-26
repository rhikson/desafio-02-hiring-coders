import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Informe o nome"),
  email: yup
    .string()
    .email("Digite um email válido")
    .required("Informe um email"),
  phone: yup.number(),
  cpf: yup
    .number()
    .typeError("O CPF deve ter 11 dígitos numéricos")
    .positive()
    .min(11, "O CPF deve ter 11 dígitos numéricos")
    .max(11, "O CPF deve ter 11 dígitos numéricos")
    .required("Informe um cpf válido"),
  cep: yup
    .number()
    .typeError("O CEP deve ter 8 dígitos numéricos")
    .positive()
    .min(8, "O CEP deve ter 8 dígitos numéricos")
    .max(8, "O CEP deve ter 8 dígitos numéricos")
    .required("Informe o CEP de sua residencia"),
  street: yup.string().required("Informa seu endereço"),
  number: yup.number().positive(),
  district: yup.string().required("Informe o bairro"),
  city: yup.string().required("Informe a cidade"),
  uf: yup.string().required("Informe o estado"),
});

function FormClient(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function saveInLocalStorage(data) {
    const storageUsers = localStorage.getItem("users");

    if (!storageUsers) {
      const users = [data];
      localStorage.setItem("users", JSON.stringify(users));
      return;
    }

    const users = JSON.parse(storageUsers);
    users.push(data);
    localStorage.setItem("users", JSON.stringify(users));
  }

  function getLastUserFromLocalStorage() {
    const users = JSON.parse(localStorage.getItem("users"));
    const lastUser = users[users.length - 1];
    return lastUser;
  }

  function handleModal() {
    props.handleModalFromForm();
  }

  const onSubmit = (data) => {
    saveInLocalStorage(data);
    const user = getLastUserFromLocalStorage();
    props.setData(user);
    alert(`O usuário '${user.name}' foi adicionado.`);
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
            id="input-client-name"
            title="Name"
            placeholder="Nome"
          />
          <p className="field-error">{errors.name?.message}</p>
        </div>

        <div className="form-group">
          <input
            {...register("email")}
            type="email"
            name="email"
            id="input-client-email"
            title="Email"
            placeholder="Email"
          />
          <p className="field-error">{errors.email?.message}</p>
        </div>

        <div className="form-group">
          <input
            {...register("phone")}
            type="tel"
            name="phone"
            id="input-client-phone"
            title="Phone"
            placeholder="Telefone"
          />
        </div>
        <div className="form-group">
          <input
            {...register("cpf")}
            type="number"
            name="cpf"
            id="input-client-cpf"
            title="CPF"
            minLength="11"
            maxLength="11"
            placeholder="CPF"
          />
          <p className="field-error">{errors.cpf?.message}</p>
        </div>

        <div className="form-group">
          <input
            {...register("cep")}
            type="number"
            name="cep"
            id="input-client-cep"
            title="CEP"
            placeholder="CEP"
          />
          <p className="field-error">{errors.cep?.message}</p>
        </div>

        <div className="form-group">
          <input
            {...register("street")}
            type="text"
            name="street"
            id="input-client-street"
            title="Street"
            placeholder="Logradouro"
          />
          <p className="field-error">{errors.street?.message}</p>
        </div>

        <div className="form-group">
          <input
            {...register("number")}
            type="number"
            name="number"
            id="input-client-number"
            title="Number"
            placeholder="Número"
          />
        </div>

        <div className="form-group">
          <input
            {...register("district")}
            type="text"
            name="district"
            id="input-client-district"
            title="District"
            placeholder="Bairro"
          />
          <p className="field-error">{errors.district?.message}</p>
        </div>

        <div className="form-group">
          <input
            {...register("city")}
            type="text"
            name="city"
            id="input-client-city"
            title="City"
            placeholder="Cidade"
          />
          <p className="field-error">{errors.city?.message}</p>
        </div>

        <div className="form-group">
          <input
            {...register("uf")}
            type="text"
            name="uf"
            id="input-client-uf"
            title="UF"
            minLength="2"
            maxLength="2"
            placeholder="Estado"
          />
          <p className="field-error">{errors.uf?.message}</p>
        </div>
        <button>Cadastrar</button>
      </form>

      <div className="btn-close" onClick={handleModal}>
        X
      </div>
    </div>
  );
}

export default FormClient;
