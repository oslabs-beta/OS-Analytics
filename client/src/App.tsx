import './App.css';

function App() {
  function handleServer() {
    const URL = 'http://localhost:8080/api';
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }

  return (
    <>
      <h1>Hello Front End</h1>
      <button onClick={() => handleServer()}>Check Server</button>
    </>
  );
}

export default App;
