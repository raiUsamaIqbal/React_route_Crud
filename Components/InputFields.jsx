import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import TextField from "@mui/material/TextField";

const InputFields = ({
  error,
  form,
  setForm,
  isOpen,
  action,
  handleSubmit,
  update,
  onCloseModal,
}) => {
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={onCloseModal}
        center
        classNames={{ modal: "rounded" }}
      >
        <div className="container " style={{ maxWidth: "400px" }}>
          {action === "add" && (
            <h3 className="mb-4" style={{ marginTop: "-10px" }}>
              Add User
            </h3>
          )}
          {action === "edit" && (
            <h3 className="mb-5" style={{ marginTop: "-10px" }}>
              Update User
            </h3>
          )}

          <form>
            <div className="row">
              <div className="col-md-12 mt-0">
                <TextField
                  style={{ width: "300px" }}
                  value={form.name}
                  placeholder="name"
                  type="name"
                  size="small"
                  name="name"
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <span className="d-block text-danger">{error.name}</span>
              </div>
              
            </div>
            <div className="row">
              <div className="col-md-12 mt-3">
                <TextField
                  style={{ width: "300px" }}
                  placeholder="email"
                  type="email"
                  size="small"
                  value={form.email}
                  name="email"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />

                <p className="text-danger">{error.email}</p>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12 mt-0">
                <TextField
                  style={{ width: "300px" }}
                  placeholder="password"
                  size="small"
                  value={form.password}
                  name="password"
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
                <p className="text-danger">{error.password}</p>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12 mt-0">
                <TextField
                  style={{ width: "300px" }}
                  placeholder="Address"
                  size="small"
                  value={form.address}
                  name="address"
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                />
                <span className="d-block text-danger">{error.address}</span>
              </div>
            </div>

            <div className="row">
              <div className="col-12 mt-3">
                <TextField
                  style={{ width: "300px"}}
                  id="outlined-size-small"
                  placeholder="city"
                  size="small"
                  value={form.city}
                  name="city"
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                />
                <span className="d-block text-danger">{error.city}</span>
              </div>
            </div>

            <div className="row">
              <div className="col-12 my-3">
                <div className="dropdown" style={{ width: "300px"}}>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value})}
                  >
                    <option>Select Role</option>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                  </select>
                </div>
                <span className="d-block text-danger">{error.role}</span>
              </div>
            </div>

            <div>
              {/* Conditional rendering of the submit or update button */}
              {action === "add" && (
                <div className="d-flex justify-content-end py-2">
                  <button
                    type="button"
                    className="btn btn-secondary me-2"
                    onClick={onCloseModal}
                  >
                    Discard
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="btn btn-success rounded"
                  >
                    Submit
                  </button>
                </div>
              )}
              {action === "edit" && (
                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn btn-secondary me-2"
                    onClick={onCloseModal}
                  >
                    Discard
                  </button>
                  <button onClick={update} className="btn btn-success rounded">
                    Update
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default InputFields;
