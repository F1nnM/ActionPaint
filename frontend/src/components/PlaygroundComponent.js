// import styles from "./ExampleSection.module.css";

function PlaygroundComponent() {
  const url = process.env.REACT_APP_BACKEND + "public_api/ping";
  const options = {
    method: "POST",
    body: JSON.stringify({
      nsame: "John",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(url, options)
    .then((res) => res.json())
    .catch((err) => {
      alert(err);
    })
    .then((data) => {
      alert(data.value);
    });
  return (
    <div>
      <p>you can use this component for testing purposes</p>
    </div>
  );
}

export default PlaygroundComponent;
