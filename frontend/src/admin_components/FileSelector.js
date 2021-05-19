import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";

import styles from "./FileSelector.module.scss"

function FileSelector({ creds, type, onSelect, artist, data, index }) {

  const [artists, setArtists] = useState(data);

  function handleUpload(e) {
    let url = process.env.REACT_APP_BACKEND + "admin/upload_image/" + type;

    let headers = new Headers();

    headers.append(
      "Authorization",
      "Basic " + btoa(creds.username + ":" + creds.password),
    );

    const files = e.target.files;

    var formData = new FormData();
    for (var i = 0; i < files.length; i++)
      formData.append('images', files[i], files[i].name);

    fetch(url, {
      method: "POST",
      headers,
      body: formData
    }).catch(err => alert(err))
      .then(data => {
        handleAddSlide(files);
        e.target.value = "";
      })
  }

  function handleAddSlide(files){
    for(var i = 0; i < files.length; i++){
      data[index].images.push(files[i].name);
    }

    setArtists([...data]);
   
    const url = process.env.REACT_APP_BACKEND + "admin/update/artists";
    let headers = new Headers();
    headers.append(
      "Authorization",
      "Basic " + btoa(creds.username + ":" + creds.password)
    );
    headers.append("Content-Type", "application/json");
    const options = {
      method: "POST",
      headers,
      body: JSON.stringify({
        content: JSON.stringify(artists),
      }),
    };
    fetch(url, options)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  function handleDelete(src, idx) {
    let url = process.env.REACT_APP_BACKEND + "admin/delete_image/" + type+ "/" +src;

    let headers = new Headers();

    headers.append(
      "Authorization",
      "Basic " + btoa(creds.username + ":" + creds.password),
    );

    fetch(url, {
      method: "DELETE",
      headers
    }).catch(err => alert(err))
      .then(data => {
        handelDeleteSlide(idx);
      })

  }

  function handelDeleteSlide(idx){

    data[index].images.splice(idx, 1);
    setArtists([...data]);
   
    const url = process.env.REACT_APP_BACKEND + "admin/update/artists";
    let headers = new Headers();
    headers.append(
      "Authorization",
      "Basic " + btoa(creds.username + ":" + creds.password)
    );
    headers.append("Content-Type", "application/json");
    const options = {
      method: "POST",
      headers,
      body: JSON.stringify({
        content: JSON.stringify(artists),
      }),
    };
    fetch(url, options)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  return (
    <Container className={styles.container}>
      
      {
        artist.images.map((src, idx) => {
          return (
            <div key={src} className={styles.imageContainer}>
              <img onClick={_=>onSelect(src)} alt={src} className={styles.image} width={100} height={100} src={process.env.REACT_APP_BACKEND + "images/" + type + "/" + src} />
              <Button onClick={_=>handleDelete(src, idx)} className={styles.deleteButton} variant="danger">-</Button>
              <span>{src}</span>
            </div>
          )
        })
      }
      <div className={styles.imageContainer + " " + styles.addBtn}>
        <input type="file" onChange={e => handleUpload(e)} />
      </div>
    </Container>
  );
}

export default FileSelector;
