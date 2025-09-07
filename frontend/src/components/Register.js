import { useState } from "react";
import api from "./api";
import { useNavigate, NavLink } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    try {
      let data = await api.post("/auth/register", { email, password, name });
      console.log(data);
      setError("");
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error.response.data.error);
    }
  };

  return (
    <section className="main-container d-flex flex-row justify-content-center align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
            <div className="card border border-light-subtle rounded-3 shadow-sm">
              <div className="card-body p-3 p-md-4 p-xl-5">
                <h1 className="fs-6 fw-normal text-center text-secondary mb-4">
                  Create your account
                </h1>
                <form onSubmit={register}>
                  <div className="row gy-2 overflow-hidden">
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          id="name"
                          onChange={(e) => setName(e.target.value)}
                          value={name}
                          placeholder="name"
                          required
                        />
                        <label htmlFor="name" className="form-label">
                          Name
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                          placeholder="name@example.com"
                          id="email"
                          required
                        />
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input
                          type={isShow ? "text" : "password"}
                          className="form-control"
                          name="password"
                          id="password"
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                          placeholder="Password"
                          required
                        />
                        <label htmlFor="password" className="form-label">
                          Password
                        </label>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="d-flex gap-2 justify-content-between">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value={isShow}
                            name="rememberMe"
                            id="showPassword"
                            onClick={() => setIsShow((prev) => !prev)}
                          />
                          <label
                            className="form-check-label text-secondary"
                            htmlFor="showPassword"
                          >
                            Show Password
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-grid my-3">
                        <button
                          className="btn btn-primary btn-lg"
                          type="submit"
                        >
                          Register
                        </button>
                      </div>
                      {error && (
                        <p className="text-danger fs-6 text-center">{error}</p>
                      )}
                    </div>
                    <div className="col-12">
                      <p className="m-0 text-secondary text-center">
                        Do have an account?{" "}
                        <NavLink
                          to="/login"
                          className="link-primary text-decoration-none"
                        >
                          Login
                        </NavLink>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
