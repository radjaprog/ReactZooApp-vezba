import React, { useState } from "react";
import "./App.css";

const animalsData = [
  { id: 1, kind: "monkey", name: "Charlie", birthdate: new Date() },
  { id: 2, kind: "lion", name: "Mufasa", birthdate: new Date() },
  { id: 3, kind: "wolf", name: "Igor", birthdate: new Date() },
  { id: 4, kind: "elephant", name: "Susane", birthdate: new Date() },
  { id: 5, kind: "mouse", name: "Pedro", birthdate: new Date() },
  { id: 6, kind: "panther", name: "Bagera", birthdate: new Date() },
  { id: 7, kind: "bear", name: "Balu", birthdate: new Date() },
];

const sectorsData = [
  "Birds",
  "Mammals",
  "Amphibians",
  "Reptiles",
  "Fish",
  "Insects",
];

function AnimalList() {
  const [animals, setAnimals] = useState(animalsData);
  const [sectors, setSectors] = useState(sectorsData);
  const [novaZivotinjka, setNovuZivotinjku] = useState({
    id: "",
    name: "",
    kind: "",
    birthdate: "",
    sector: sectors[0],
  });

  const handleRemoveAnimal = (animalIndex) => {
    setAnimals([
      ...animals.slice(0, animalIndex),
      ...animals.slice(animalIndex + 1),
    ]);
  };

  const handleMoveAnimalToTop = (animalIndex) => {
    setAnimals([
      animals[animalIndex],
      ...animals.slice(0, animalIndex),
      ...animals.slice(animalIndex + 1),
    ]);
  };

  const handleDodajImeNovojZivotinjki = (name) => {
    setNovuZivotinjku({
      ...novaZivotinjka,
      id: Math.random(),
      name,
    });
  };

  const handleDodajVrstuNovojZivotinjki = (kind) => {
    setNovuZivotinjku({
      ...novaZivotinjka,
      kind,
    });
  };

  const handleDodajDatumNovojZivotinjki = (birthdate) => {
    setNovuZivotinjku({
      ...novaZivotinjka,
      birthdate: new Date(birthdate),
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    setAnimals([...animals, novaZivotinjka]);
    setNovuZivotinjku({
      id: "",
      species: "",
      name: "",
      dateOfBirth: "",
      sector: sectors[0],
    });
  };

  const handleSectorChange = (sectorValue) => {
    setNovuZivotinjku({
      ...novaZivotinjka,
      sector: sectorValue,
    });
  };

  const checkAnimalsWithSector = (sector) => {
    const sectorAnimals = animals.filter((animal) => animal.sector === sector);
    // .map(animal => animal.name + ',');

    alert(JSON.stringify(sectorAnimals));
  };

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <div class="mb-5">
          <label>
            &nbsp; Ime zivotinje: &nbsp;
            <input
              required
              type="text"
              value={novaZivotinjka.name}
              onChange={(e) => handleDodajImeNovojZivotinjki(e.target.value)}
            />
          </label>
        </div>
        <label>
          Vrsta zivotinje:
          <input
            required
            type="text"
            value={novaZivotinjka.kind}
            onChange={(e) => handleDodajVrstuNovojZivotinjki(e.target.value)}
          ></input>
        </label>
        <br />
        <label>
          &nbsp;&nbsp; Datum rodjenja zivotinje: &nbsp;
          <input
            class="col-xs-offset-2"
            required
            type="date"
            value={
              novaZivotinjka.birthdate
                ? novaZivotinjka.birthdate.toISOString().substring(0, 10)
                : ""
            }
            onChange={(e) => handleDodajDatumNovojZivotinjki(e.target.value)}
          ></input>
        </label>
        &nbsp;
        <select
          onChange={(e) => handleSectorChange(e.target.value)}
          value={novaZivotinjka.sector}
        >
          {sectors.map((sector, index) => (
            <option key={index}>{sector}</option>
          ))}
        </select>
        <button type="submit">Dodaj novu zivotinju</button>
      </form>

      <h2>Animals</h2>
      <table>
        <thead>
          <tr>
            <th>Kind</th>
            <th>Name</th>
            <th>Birthdate</th>
            <th>Sector</th>
          </tr>
        </thead>
        <tbody>
          {animals.map((animal, index) => (
            <tr key={animal.id}>
              <td>{animal.kind}</td>
              <td>{animal.name}</td>
              <td>
                {animal.birthdate
                  ? animal.birthdate.toDateString()
                  : "Nepoznat"}
              </td>
              <td>{animal.sector ?? "Nepoznat"}</td>
              <td>
                <button onClick={() => handleRemoveAnimal(animal.name)}>
                  Remove
                </button>
              </td>
              <td>
                <button onClick={() => handleMoveAnimalToTop(index)}>
                  ON TOP
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Sektori</h3>
      <table>
        <thead>
          <tr>
            <th>Sektor</th>
          </tr>
        </thead>
        <tbody>
          {sectors.map((sector, index) => (
            <tr key={index}>
              <td>{sector}</td>
              <td>
                <button onClick={() => checkAnimalsWithSector(sector)}>
                  Check animals
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AnimalList;
