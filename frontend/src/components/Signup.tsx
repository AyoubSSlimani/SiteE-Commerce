import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  async function Inscription(e: any) {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios({
        method: "post",
        url: "http://localhost:9999/api/user/register",
        data: { email, password },
      });
      if (response) {
        const response2 = await axios({
          method: "post",
          url: "http://localhost:9999/api/user/login",
          data: { email, password },
          withCredentials: true,
        });
        if (response2) {
          navigate("/");
          window.location.reload();
        }
      }
    } catch (err: any) {
      setErrors({
        email: err.response.data.errors.email,
        password: err.response.data.errors.password,
      });
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      {loading && (
        <div className="z-50 absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-transparent border-2 border-blue-500 animate-spin" />
      )}
      <h3 className="font-semibold text-lg uppercase">Inscription</h3>
      <p className="text-xs">Saisissez une adresse email et un mot de passe</p>
      <form
        className="font-serif text-sm flex flex-col gap-3"
        onSubmit={Inscription}
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="emailSignUp">Email</label>
          <input
            type="email"
            name="emailSignUp"
            className="input"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email ? <p className="text-red-500">{errors.email}</p> : null}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="passwordSignup">Mot de passe</label>
          <input
            type="password"
            name="passwordSignUp"
            className="input"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password ? (
            <p className="text-red-500">{errors.password}</p>
          ) : null}
        </div>
        <button
          type="submit"
          className="bg-blue-500 px-4 py-2 rounded-2xl text-white hover:bg-blue-600 duration-150"
        >
          Créer mon compte
        </button>
      </form>
    </>
  );
}
