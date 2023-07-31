import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import API_BASE_URL from "../development/config";
import Swal from "sweetalert2"; // Import SweetAlert library
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRandom } from "@fortawesome/free-solid-svg-icons";
import { faIconName } from '@fortawesome/free-solid-svg-icons';


const AddInventory = () => {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [gender, setGender] = useState("Male");
  const [noAsset, setNoAsset] = useState("");
  const [merk, setMerk] = useState("");
  const [type, setType] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [pengguna, setPengguna] = useState("");
  const [lokasiTerbaru, setLokasiTerbaru] = useState("JOGJA GPPG");
  const [kondisi, setKondisi] = useState("normal");
  const [mouse, setMouse] = useState("");
  const [mousepad, setMousepad] = useState("ada");
  const [headset, setHeadset] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const navigate = useNavigate();

  // const saveUser = async (e) => {
  // const saveInventory = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await axios.post(`${API_BASE_URL}`, {
  //       // name,
  //       // email,
  //       // gender,
  //       noAsset,
  //       merk,
  //       type,
  //       serialNumber,
  //       pengguna,
  //       lokasiTerbaru,
  //       kondisi,
  //       mouse,
  //       mousepad,
  //       headset,
  //       keterangan,
  //     });
  //     navigate("/");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const saveInventory = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}`, {
        noAsset,
        merk,
        type,
        serialNumber,
        pengguna,
        lokasiTerbaru,
        kondisi,
        mouse,
        mousepad,
        headset,
        keterangan,
      });

      // Show a success message using SweetAlert
      Swal.fire({
        icon: "success",
        title: "Data Added!",
        text: "The inventory data has been added successfully.",
        confirmButtonText: "OK",
      }).then(() => {
        // After clicking "OK", navigate back to the home page
        navigate("/");
      });
    } catch (error) {
      console.log(error);
    }
  };

  const generateRandomString = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "/-";

    let randomString = "";
    for (let i = 0; i < 3; i++) {
      // Add random uppercase or lowercase letter
      randomString += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    randomString += symbols.charAt(Math.floor(Math.random() * symbols.length));
    for (let i = 0; i < 3; i++) {
      // Add random number
      randomString += numbers.charAt(
        Math.floor(Math.random() * numbers.length)
      );
    }
    randomString += symbols.charAt(Math.floor(Math.random() * symbols.length));
    for (let i = 0; i < 3; i++) {
      // Add random number
      randomString += numbers.charAt(
        Math.floor(Math.random() * numbers.length)
      );
    }

    return randomString;
  };

  // const backendURL = "https://inventorybms-api.onrender.com/inventories/";

  // Step 3: Function to check if the generated number exists in the database
  const checkIfNoAssetExistsInDatabase = async (generatedNoAsset) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}?noAsset=${generatedNoAsset}`
      );
      // If the response contains any data, it means the number exists in the database
      return response.data.length > 0;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const handleGenerateNoAsset = async () => {
    let generatedNoAsset = generateRandomString();

    // Check if the generatedNoAsset already exists in the database
    let existsInDatabase = await checkIfNoAssetExistsInDatabase(
      generatedNoAsset
    );

    // Generate a new number until a unique one is found
    while (generatedNoAsset === noAsset || existsInDatabase) {
      generatedNoAsset = generateRandomString();
      existsInDatabase = await checkIfNoAssetExistsInDatabase(generatedNoAsset);
    }

    setNoAsset(generatedNoAsset);
  };

  return (
    <div className="columns">
      <div className="column is-half">
        <form onSubmit={saveInventory}>
          <div className="field">
            <label className="label">No.Asset</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={noAsset}
                onChange={(e) => setNoAsset(e.target.value)}
                placeholder="No.Asset"
              />
            </div>
            <div className="control">
              <button
                type="button"
                className="button"
                onClick={handleGenerateNoAsset}
              >
                <FontAwesomeIcon icon={faRandom} />
              </button>
            </div>
          </div>
          <div className="field">
            <label className="label">Merk</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={merk}
                onChange={(e) => setMerk(e.target.value)}
                placeholder="Merk"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Type</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="Merk"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Serial Number</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                placeholder="Serial Number"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Pengguna</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={pengguna}
                onChange={(e) => setPengguna(e.target.value)}
                placeholder="Pengguna"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Lokasi Terbaru</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select
                  value={lokasiTerbaru}
                  onChange={(e) => setLokasiTerbaru(e.target.value)}
                >
                  <option value="JOGJA GPPG">JOGJA GPPG</option>
                  <option value="JOGJA SPEEDCASH">JOGJA SPEEDCASH</option>
                </select>
              </div>
            </div>
          </div>
          <div className="field">
            <label className="label">Kondisi</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select
                  value={kondisi}
                  onChange={(e) => setKondisi(e.target.value)}
                >
                  <option value="normal">normal</option>
                  <option value="rusak">rusak</option>
                </select>
              </div>
            </div>
          </div>
          <div className="field">
            <label className="label">Mouse</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={mouse}
                onChange={(e) => setMouse(e.target.value)}
                placeholder="Mouse"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Mousepad</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select
                  value={mousepad}
                  onChange={(e) => setMousepad(e.target.value)}
                >
                  <option value="ada">ada</option>
                  <option value="tidak ada">tidak ada</option>
                </select>
              </div>
            </div>
          </div>
          <div className="field">
            <label className="label">Headset</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={headset}
                onChange={(e) => setHeadset(e.target.value)}
                placeholder="Headset"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Keterangan</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={keterangan}
                onChange={(e) => setKeterangan(e.target.value)}
                placeholder="Keterangan"
              />
            </div>
          </div>
          <div className="field">
            <div
              className="control"
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <button type="submit" className="button is-success">
                Save
              </button>
              <Link
                to="/"
                className="button is-danger"
                style={{ marginLeft: "5px" }}
              >
                Cancel
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddInventory;
