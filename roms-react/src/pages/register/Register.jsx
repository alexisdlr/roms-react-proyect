import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Alert from "../../components/Alerta/Alert";
import clientAxios from "../../axios/clientAxios";
import { HiUserAdd } from "react-icons/hi";
import "./Register.scss";
function Register() {
  const [err, setErr] = useState({});
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    const { username, email, password, name } = inputs;

    try {
      const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if ([username, email, password, name].includes("")) {
        setErr({
          msg: "Ningun campo debe estar vacio",
          error: true,
        });
        setTimeout(() => {
          setErr({});
        }, 3000);
        return;
      }
      if (!re.test(inputs.email)) {
        setErr({
          msg: "Introduce un email válido",
          error: true,
        });
        setTimeout(() => {
          setErr({});
        }, 3000);
        return;
      }
      if (password.length < 6) {
        setErr({
          msg: "Utiliza un password de al menos 6 carácteres",
          error: true,
        });
        setTimeout(() => {
          setErr({});
        }, 3000);
        return;
      }
      await clientAxios.post("/auth/register", {
        username,
        email,
        password,
        name,
      });
      setErr({
        msg: "Registrado Correctamente",
        error: false,
      });
    } catch (error) {
      setErr(error.response.data);
    }
  };

  return (
    <div className="register">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, type: "tween" }}
        className="card"
      >
        <div className="left">
          <h1>Game {""}Load X</h1>

          <span>Ya tienes una cuenta?</span>
          <Link to="/login">
            <button>Inicia Sesión</button>
          </Link>
        </div>
        <div className="right">
          {err.msg && <Alert err={err} />}
          <h2>
            Crear nueva cuenta <HiUserAdd />
          </h2>
          <form autoComplete="off">
            <input
              type="text"
              required
              name="username"
              placeholder="Username"
              onChange={handleChange}
            />
            <input
              type="email"
              required
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />
            <input
              type="password"
              required
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
            <input
              type="text"
              required
              name="name"
              placeholder="name"
              onChange={handleChange}
            />

            <button onClick={handleClick}>Crear cuenta</button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default Register;
