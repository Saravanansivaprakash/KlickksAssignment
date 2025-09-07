import api from "./api";
import { useNavigate, useOutletContext } from "react-router-dom";
const Dashboard = () => {
  const { user } = useOutletContext();
  const navigate = useNavigate();
  const logout = async () => {
    try {
      await api.post("/auth/logout");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = async () => {
    const isDelete = window.confirm("Do you want to delete?");
    if (isDelete) {
      try {
        await api.delete("/auth/delete");
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <nav className="bg-secondary d-flex justify-content-between align-items-center px-3 py-2">
        <div className="bg-primary text-white rounded-circle px-3 py-2 text-center ">
          <h2 className="text-white text-center">
            {user.name[0].toUpperCase()}
          </h2>
        </div>

        <button type="button" className="btn btn-danger" onClick={logout}>
          Log out
        </button>
      </nav>
      <section className="vh-100 p-4">
        <h2>Welcome, {user?.name.toUpperCase()}...! </h2>
        <div className="h-100 d-flex justify-content-center align-items-start p-5 m-5">
          <div className="card col-12 col-md-6 d-flex justify-content-center align-items-center p-2">
            <img
              src="../boy2.png"
              alt="avatar"
              className="w-50"
              style={{ maxWidth: "150px" }}
            />
            <div className="card-body">
              <h6>Name: {user?.name}</h6>
              <p>E-mail: {user?.email}</p>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={onDelete}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
