import {useEffect, useState} from 'react';
import API from '../api';
import './Crud.css';

const Crud=()=>{

  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchUsers = async() => {
    const res = await API.get("users/index.php");
    setUsers(res.data)
  };

  useEffect(() => {
    fetchUsers();
  }, []);

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(editId) {
          await API.put("users/update.php", {id: editId, name, email});
        } else {
          await API.post("users/store.php", { name, email});
        }
        setName("");
        setEmail("");
        setEditId(null);
        fetchUsers();
    };

  const handleEdit = (user) => {
    setName(user.name);
    setEmail(user.email);
    setEditId(user.id);
  };

  const handleDelete = async(id) => {
     await API.delete("users/delete.php", { data: {id} });
     fetchUsers();
  };

  return (
    <div className="container">
      <h2>React CRUD</h2>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter name" value={name}
          onChange={(e) => setName(e.target.value)} required/>

        <input type="email" placeholder="Enter email" value={email}
          onChange={(e) => setEmail(e.target.value)} required/>

        <button type="submit">
          {editId ? "Update User" : "Add User"}
        </button>
      </form>

      <h2>User List</h2>

      {users.map((user) => (
        <div className="user-card" key={user.id}>
          <div className="user-info">
            <strong>{user.name}</strong><br />
            {user.email}
          </div>

          <div className="actions">
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Crud;