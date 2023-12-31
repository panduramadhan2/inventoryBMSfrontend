import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import API_BASE_URL from "../development/config";
import Swal from "sweetalert2"; // Import SweetAlert library
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRandom } from "@fortawesome/free-solid-svg-icons";
import { faIconName } from "@fortawesome/free-solid-svg-icons";

const AddInventory = () => {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [gender, setGender] = useState("Male");
  // const [inventories, setInventories] = useState([]);
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
  // useEffect(() => {
  //   getInventory()
  // }, []);

  // async function getInventory() {
  //   try {
  //     const response = await axios.get(`${API_BASE_URL}`);
  //     setInventories(response.data);
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

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
    // for (let i = 0; i < 6; i++) {
    //   // Add random uppercase or lowercase letter
    //   randomString += characters.charAt(
    //     Math.floor(Math.random() * characters.length)
    //   );
    // }

    for (let i = 0; i < 6; i++) {
      // Add random uppercase, lowercase letter, or number
      const randomChar = characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
      const randomNum = numbers.charAt(
        Math.floor(Math.random() * numbers.length)
      );

      // Randomly choose whether to add a character or a number
      randomString += Math.random() < 0.5 ? randomChar : randomNum;
    }

    randomString += symbols.charAt(Math.floor(Math.random() * symbols.length));

    for (let i = 0; i < 10; i++) {
      // Add random uppercase, lowercase letter, or number
      const randomChar = characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
      const randomNum = numbers.charAt(
        Math.floor(Math.random() * numbers.length)
      );

      // Randomly choose whether to add a character or a number
      randomString += Math.random() < 0.5 ? randomChar : randomNum;
    }

    randomString += symbols.charAt(Math.floor(Math.random() * symbols.length));

    for (let i = 0; i < 12; i++) {
      // Add random uppercase, lowercase letter, or number
      const randomChar = characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
      const randomNum = numbers.charAt(
        Math.floor(Math.random() * numbers.length)
      );

      // Randomly choose whether to add a character or a number
      randomString += Math.random() < 0.5 ? randomChar : randomNum;
    }

    randomString += symbols.charAt(Math.floor(Math.random() * symbols.length));

    for (let i = 0; i < 3; i++) {
      // Add random uppercase, lowercase letter, or number
      const randomChar = characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
      const randomNum = numbers.charAt(
        Math.floor(Math.random() * numbers.length)
      );

      // Randomly choose whether to add a character or a number
      randomString += Math.random() < 0.5 ? randomChar : randomNum;
    }

    return randomString;
  };

  // const handleGenerateNoAsset = () => {
  //   console.log("Generating new No.Asset...");
  //   const generatedNoAsset = generateRandomString();
  //   setNoAsset(generatedNoAsset);
  // };

  const handleGenerateNoAsset = async () => {
    console.log("Generating new No.Asset...");
    let generatedNoAsset = generateRandomString();

    // Step 1: Get all existing No.Asset values from the database
    try {
      const response = await axios.get(`${API_BASE_URL}`);
      const existingNoAssets = response.data.map((item) => item.noAsset);

      // Step 2: Check if the generatedNoAsset already exists in the database
      const existsInDatabase = existingNoAssets.includes(generatedNoAsset);

      // Step 3: Generate a new number until a unique one is found
      while (existsInDatabase) {
        console.log("Number already exists, generating a new one...");
        generatedNoAsset = generateRandomString();
        existsInDatabase = existingNoAssets.includes(generatedNoAsset);
      }

      // Step 4: Update the state with the generated value
      setNoAsset(generatedNoAsset);
    } catch (error) {
      console.log(error);
    }
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
