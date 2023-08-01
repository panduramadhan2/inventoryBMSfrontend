import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
// import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// import { saveAs } from "file-saver";
import ExcelJS from "exceljs";
import Swal from "sweetalert2"; // Import SweetAlert library

import Login from "./Login/Login";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { firebaseConfig } from "../firebase/firebaseConfig";
import API_BASE_URL from "../development/config";

const InventoryList = () => {
  const [inventories, setInventories] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true); // Add this line
  const [error, setError] = useState(null); // Add this line

  const [user, setUser] = useState(null); // Track the authenticated user

  const [isUser, setIsUser] = useState(false); // Uncomment this line

  useEffect(() => {
    // Initialize Firebase (Make sure to replace 'firebaseConfig' with your actual config object)
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    // Add a listener to detect the user's authentication state
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        setUser(user);

        // Check if the user has the 'admin' role
        const isUser =
          user && user.customClaims && user.customClaims.role === "user";

        setIsUser(isUser);

        getInventory();
      } else {
        // User is signed out
        setUser(null);
        setLoading(false); // Set loading to false if the user is not authenticated
      }
      setLoading(false); // Set loading to false once authentication is checked
    });

    return () => unsubscribe(); // Clean up the listener when the component unmounts
  }, []);

  useEffect(() => {
    // Fetch inventory data if the user is authenticated
    if (user) {
      getInventory();
    }
  }, [user]);

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Logout successful, do any additional cleanup or actions if needed
      })
      .catch((error) => {
        console.error("Logout error:", error);
        // Handle logout error if any
      });
  };

  async function getInventory() {
    try {
      const response = await axios.get(`${API_BASE_URL}`);
      setInventories(response.data);
      console.log(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  // const deleteInventory = async (id) => {
  //   try {
  //     await axios.delete(`${API_BASE_URL}${id}`);
  //     // setInventories();
  //     setInventories((prevInventories) =>
  //       prevInventories.filter((item) => item._id !== id)
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const deleteInventory = async (id) => {
    try {
      // Show a SweetAlert confirmation dialog
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        // User confirmed the delete, proceed with the deletion
        await axios.delete(`${API_BASE_URL}${id}`);
        // setInventories();
        setInventories((prevInventories) =>
          prevInventories.filter((item) => item._id !== id)
        );

        // Show a success message
        Swal.fire("Deleted!", "The inventory has been deleted.", "success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleExportData = async () => {
    try {
      // Fetch the data from the server
      const response = await axios.get(`${API_BASE_URL}`);

      // Create a new workbook and worksheet using ExcelJS
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Inventory Data");

      // Define the columns and set the header row
      const columns = [
        { header: "No", key: "index" },
        { header: "No.Asset", key: "noAsset" },
        { header: "Merk", key: "merk" },
        { header: "Type", key: "type" },
        { header: "Serial Number", key: "serialNumber" },
        { header: "Pengguna", key: "pengguna" },
        { header: "Lokasi Terbaru", key: "lokasiTerbaru" },
        { header: "Kondisi", key: "kondisi" },
        { header: "Mouse", key: "mouse" },
        { header: "Mousepad", key: "mousepad" },
        { header: "Headset", key: "headset" },
        { header: "Keterangan", key: "keterangan" },
      ];
      worksheet.columns = columns;

      // Add the data rows to the worksheet
      response.data.forEach((inventory, index) => {
        const rowValues = {
          index: index + 1, // Use index + 1 as the "No" value
          noAsset: inventory.noAsset,
          merk: inventory.merk,
          type: inventory.type,
          serialNumber: inventory.serialNumber,
          pengguna: inventory.pengguna,
          lokasiTerbaru: inventory.lokasiTerbaru,
          kondisi: inventory.kondisi,
          mouse: inventory.mouse,
          mousepad: inventory.mousepad,
          headset: inventory.headset,
          keterangan: inventory.keterangan,
        };
        const row = worksheet.addRow(rowValues);

        // Add border styling to each row
        row.eachCell((cell) => {
          cell.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
        });
      });
      // Add the header row and apply border styling
      const headerRow = worksheet.getRow(1);
      headerRow.eachCell((cell) => {
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
      // })

      // Set the response content type and headers
      // const contentDisposition = `attachment; filename="inventory_data.xlsx"`;
      const contentDisposition = `attachment; filename="inventory_data.xlsx"`;
      const contentType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      const buffer = await workbook.xlsx.writeBuffer();

      // Create a Blob with the Excel data
      const blob = new Blob([buffer], { type: contentType });

      // Create a link and click it to trigger the download
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download =
        "ISC-Data inventaris laptop & pheriperal site jogja.xlsx";
      downloadLink.click();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div
      className="container"
      style={{
        margin: "0",
        padding: "0",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <button
        onClick={handleLogout}
        className="button is-danger"
        style={{ float: "right", margin: "2%" }}
      >
        Logout
      </button>
      {user.customClaims.role === "admin" && (
        <Link
          to="add"
          className="button is-success"
          style={{ marginTop: "2%" }}
        >
          Add New
        </Link>
      )}

      <div
        style={{
          border: "1px solid black",
          borderRadius: "10px",
          paddingLeft: "10px",
          width: "300px",
          marginTop: "20px",
          boxShadow: "0 2px 4px rgba(1, 0, 0, 0.4)",
        }}
      >
        <InputGroup className="my-3" style={{ flexDirection: "row" }}>
          {/* Search icon inside the InputGroup */}
          <InputGroup.Text>
            <i className="bi bi-search"></i>
          </InputGroup.Text>
          <Form.Control
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search data Inventory"
            style={{ border: "none", padding: "8px", margin: "0" }}
          />
        </InputGroup>
      </div>

      {user.customClaims.role === "admin" && (
        <button
          onClick={handleExportData}
          className="button is-primary"
          style={{ marginTop: "2%" }}
        >
          Export Data
        </button>
      )}

      <div
        className="table-container"
        style={{
          overflowX: "auto",
          width: "100%",
          margin: "0",
          maxHeight: "calc(100vh - 200px)",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            maxWidth: "1000px",
            "@media (max-width: 768px)": { maxWidth: "500px" },
          }}
        >
          <table
            className="table is-striped is-narrow mt-2"
            style={{
              tableLayout: "auto",
              fontSize: "0.8em",
              width: "100%",
              overflowX: "hidden",
            }}
          >
            <colgroup>
              {/* Set specific column widths to adjust layout */}
              <col style={{ width: "5%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "5%" }} />
              <col style={{ width: "5%" }} />
              <col style={{ width: "5%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "15%" }} />
            </colgroup>
            <thead>
              <tr>
                <th>No</th>
                <th>No.Asset</th>
                <th>Merk</th>
                <th>Type</th>
                <th>Serial Number</th>
                <th>Pengguna</th>
                <th>Lokasi Terbaru</th>
                <th>Kondisi</th>
                <th>Mouse</th>
                <th>Mousepad</th>
                <th>Headset</th>
                <th>Keterangan</th>
                {/* Use 'user.customClaims.role' to determine if the user is an admin or not */}
                {/* Fix the condition here */}
                {user.customClaims.role !== "user" && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {inventories
                .filter((inventory) => {
                  const searchQuery = search.toLowerCase();

                  if (searchQuery === "") {
                    return true; // If the search query is empty, show all inventories
                  } else {
                    return (
                      inventory.noAsset.toLowerCase().includes(searchQuery) ||
                      inventory.merk.toLowerCase().includes(searchQuery) ||
                      inventory.type.toLowerCase().includes(searchQuery) ||
                      inventory.serialNumber
                        .toLowerCase()
                        .includes(searchQuery) ||
                      inventory.pengguna.toLowerCase().includes(searchQuery) ||
                      inventory.lokasiTerbaru
                        .toLowerCase()
                        .includes(searchQuery) ||
                      inventory.kondisi.toLowerCase().includes(searchQuery) ||
                      inventory.mouse.toLowerCase().includes(searchQuery) ||
                      inventory.mousepad.toLowerCase().includes(searchQuery) ||
                      inventory.headset.toLowerCase().includes(searchQuery) ||
                      inventory.keterangan.toLowerCase().includes(searchQuery)
                    );
                  }
                })
                .map((inventory, index) => (
                  <tr key={inventories._id}>
                    <td>{index + 1}</td>
                    <td>{inventories.noAsset}</td>
                    <td>{inventories.merk}</td>
                    <td>{inventories.type}</td>
                    <td>{inventories.serialNumber}</td>
                    <td>{inventories.pengguna}</td>
                    <td>{inventories.lokasiTerbaru}</td>
                    <td>{inventories.kondisi}</td>
                    <td>{inventories.mouse}</td>
                    <td>{inventories.mousepad}</td>
                    <td>{inventories.headset}</td>
                    <td>{inventories.keterangan}</td>
                    {user.customClaims.role !== "user" && (
                      <td>
                        <Link
                          to={`edit/${inventory._id}`}
                          className="button is-info is-small"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => deleteInventory(inventory._id)}
                          className="button is-danger is-small"
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InventoryList;
