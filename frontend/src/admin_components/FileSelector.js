import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";

import styles from "./FileSelector.module.scss"

function FileSelector({ creds, type, onSelect }) {

  function loadImages() {
    let url = process.env.REACT_APP_BACKEND + "admin/list_images";

    let headers = new Headers();

    headers.append(
      "Authorization",
      "Basic " + btoa(creds.username + ":" + creds.password)
    );

    fetch(url, {
      method: "GET",
      headers,
    }).then(data => data.json())
      .catch(err => alert(err))
      .then(data => { setImageList(data[type]) })
      .catch(err => alert(err));
  }

  const [imageList, setImageList] = useState([]);

  useEffect(_ => {
    loadImages();
  }, []);

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
        e.target.value = "";
        loadImages();
      })

  }

  function handleDelete(src) {
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
        loadImages();
      })

  }

  return (
    <Container className={styles.container}>
      {
        imageList.map(src => {
          return (
            <div key={src} className={styles.imageContainer}>
              <img onClick={_=>onSelect(src)} alt={src} className={styles.image} width={100} height={100} src={process.env.REACT_APP_BACKEND + "images/" + type + "/" + src} />
              <Button onClick={_=>handleDelete(src)} className={styles.deleteButton} variant="danger">-</Button>
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
