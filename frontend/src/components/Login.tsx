import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  async function SubmitHandler(e: any) {
    e.preventDefault();
    if (password.length >= 4) {
      try {
        setLoading(true);
        const response = await axios({
          method: "post",
          url: `${import.meta.env.VITE_SERVER_URL}/api/user/login`,
          data: { email, password },
          withCredentials: true,
        });
        if (response) {
          navigate("/");
          window.location.reload();
        }
      } catch (err: any) {
        setErrors({
          email: err.response.data.errors.email,
          password: err.response.data.errors.password,
        });
      } finally {
        setLoading(false);
      }
    } else {
      setErrors((prev) => ({
        ...prev,
        password: "Le mot de passe doit être d'au moins 4 caractères",
      }));
    }
  }

  return (
    <>
      {loading && (
        <div className="z-50 absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-transparent border-2 border-blue-500 animate-spin" />
      )}
      <h3 className="font-semibold text-lg uppercase">Connexion</h3>
      <form
        className="font-serif text-sm flex flex-col gap-3"
        onSubmit={SubmitHandler}
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="input"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email ? <p className="text-red-500">{errors.email}</p> : null}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            name="password"
            id="password"
            className="input"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password ? (
            <p className="text-red-500">{errors.password}</p>
          ) : null}
        </div>
        <button
          type="submit"
          className="bg-blue-500 px-4 py-2 rounded-2xl text-white hover:bg-blue-600 duration-150"
        >
          Se connecter
        </button>
      </form>
      <button
        type="button"
        className="text-sm text-blue-500 underline hover:no-underline"
      >
        Mot de passe oublié ?
      </button>
    </>
  );
}
