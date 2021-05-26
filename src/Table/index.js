import { useState, useEffect } from "react"
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import PaginationCommon from "../Pagination";

async function getUser() {
  const data = await fetch('https://5e674fdd1937020016fed91c.mockapi.io/user')
  return await data.json();
}

const columns = [
  {
    dataField: "name",
    text: "name",
    sort: true
  },
  {
    dataField: "email",
    text: "email",
    sort: true
  },
  {
    dataField: "position",
    text: "position"
  }
]
export default function Table() {
  const [listUser, setListUser] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", position: "" });
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(
    async () => {
      const user = await getUser();
      setListUser(user);
    },
    []
  );

  const handleChange = e => {
    const { name, value } = e.target;
    setNewUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  const addNewRow = async () => {
    await fetch('https://5e674fdd1937020016fed91c.mockapi.io/user', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(newUser)
    });
    const user = await getUser();
    setListUser(user);
    setNewUser({ name: "", email: "", position: "" });

  }
  const onPageChanged = (
    (event, page) => {
      event.preventDefault();
      setCurrentPage(page);
    }
  );
  const currentData = listUser.slice(
    (currentPage - 1) * 5,
    (currentPage - 1) * 5 + 5
  );
  return (
    <div style={{ padding: "20px" }}>
      <h1 className="h2">Table</h1>
      {currentData.length > 0 &&
        <div>
          <BootstrapTable
            keyField="id"
            data={currentData}
            columns={columns}
          />
          <PaginationCommon
            totalRecords={listUser.length}
            pageLimit={5}
            pageNeighbours={1}
            onPageChanged={onPageChanged}
            currentPage={currentPage}
          />
        </div>
      }

      <input onChange={handleChange} name="name" type="text" placeholder="Input name"
        value={newUser.name}
      />
      <input name="email" type="text" placeholder="Input email"
        onChange={handleChange}
        value={newUser.email}
      />
      <input name="position" onChange={handleChange} type="text" placeholder="Input position"
        value={newUser.position} />
      <button onClick={addNewRow}>Add New</button>

    </div>
  )
};