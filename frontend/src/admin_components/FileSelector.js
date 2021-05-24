import { useState } from "react";
import { Button, Container, Modal } from "react-bootstrap";

import styles from "./FileSelector.module.scss"

function FileSelector({ creds, type, artist, data, index, rerender }) {

  const [artists, setArtists] = useState(data);
  const [showImageSelect, setShowImageSelect] = useState(false);

  function handleUpload(e) {
    const files = e.target.files;
    var NameArray = [];

    for (let i = 0; i < files.length; i++) {
      NameArray.push(Date.now().toString() + "_" + files[i].name);
    }

    let url = process.env.REACT_APP_BACKEND + "admin/upload_image/" + type;

    let headers = new Headers();

    headers.append(
      "Authorization",
      "Basic " + btoa(creds.username + ":" + creds.password),
    );

    var formData = new FormData();
    for (let i = 0; i < files.length; i++)
      formData.append('images', files[i], NameArray[i]);

    fetch(url, {
      method: "POST",
      headers,
      body: formData
    }).catch(err => alert(err))
      .then(data => {
        handleAddSlide(NameArray);
        e.target.value = "";
      })
  }

  function handleAddSlide(NameArray) {
    for (var i = 0; i < NameArray.length; i++) {
      data[index].images.push(NameArray[i]);
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
      body: JSON.stringify(artists)
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
    let url = process.env.REACT_APP_BACKEND + "admin/delete_image/" + type + "/" + src;

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
        if (type === "artist") {
          handleDeleteSlide(idx);
        }
      })
  }

  function handleDeleteSlide(idx) {

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
      body: JSON.stringify(artists),
    };
    fetch(url, options)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  function handleUpdate(e) {
    var toBeDeleted = artists.members[index].imageUrl;
    const files = e.target.files;
    const filename = Date.now().toString() + files[0].name;

    let url = process.env.REACT_APP_BACKEND + "admin/upload_image/" + type;

    let headers = new Headers();

    headers.append(
      "Authorization",
      "Basic " + btoa(creds.username + ":" + creds.password),
    );

    var formData = new FormData();
    formData.append('images', files[0], filename);

    fetch(url, {
      method: "POST",
      headers,
      body: formData
    }).catch(err => alert(err))
      .then(data => {
        if(toBeDeleted){
          handleDelete(toBeDeleted, 0);
        }
        if (index === 999) {
          handleUpdateTeam(filename);
        } else {
          handleUpdateWorker(filename);
        }
        e.target.value = "";
      setArtists({...data});
      })
  }

  function handleUpdateWorker(filename) {
    var toBeDeleted = artists.members[index].imageUrl;
    artists.members[index].imageUrl = filename;

    setArtists({...artists});

    const url = process.env.REACT_APP_BACKEND + "admin/update/about";

    let headers = new Headers();
    headers.append(
      "Authorization",
      "Basic " + btoa(creds.username + ":" + creds.password)
    );
    headers.append("Content-Type", "application/json");
    const options = {
      method: "POST",
      headers,
      body: JSON.stringify(artists),
    };
    fetch(url, options)
      .then((data) => {
        console.log(toBeDeleted);
        if (toBeDeleted) {
          handleDelete(toBeDeleted, 0);
        }
        setArtists({...artists});
        rerender();
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  function handleUpdateTeam(filename) {
    var toBeDeleted = data.imageUrl;
    data.imageUrl = filename;

    setArtists({ ...data });

    const url = process.env.REACT_APP_BACKEND + "admin/update/about";

    let headers = new Headers();
    headers.append(
      "Authorization",
      "Basic " + btoa(creds.username + ":" + creds.password)
    );
    headers.append("Content-Type", "application/json");
    const options = {
      method: "POST",
      headers,
      body: JSON.stringify(artists)
    };
    fetch(url, options)
      .then((data) => {
        console.log(data);
        handleDelete(toBeDeleted);
        rerender();
      })
      .catch((err) => {
        console.warn(err);
      });
  }


  if (type === "artist") {
    return (
      <Container className={styles.container}>
        {artist.images ?
          artist.images.map((src, idx) => {
            return (
              <div key={src} className={styles.imageContainer}>
                <img alt={src} className={styles.image} width={100} height={100} src={process.env.REACT_APP_BACKEND + "images/" + type + "/" + src} />
                <Button onClick={_ => handleDelete(src, idx)} className={styles.deleteButton} variant="danger">-</Button>
                <span>{src}</span>
              </div>
            )
          })
          : ""
        }
        <div className={styles.imageContainer + " " + styles.addBtn}>
          <input type="file" onChange={e => handleUpload(e)} />
        </div>
      </Container>
    );
  } else if(index !== 999){
    return (
      <>
        <Button
          variant="info"
          onClick={(_) => setShowImageSelect(true)}
          key={artist + index + "Button"}
        >
          Change
                    </Button>
        <Modal key={artist + index} show={showImageSelect} onHide={() => setShowImageSelect(false)}>
          <Modal.Header
            closeButton
            onClick={(_) => setShowImageSelect(false)}
          >
            <Modal.Title>Choose an image</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container className={styles.container}>
              {artist.imageUrl ?
                <div key={artist.imageUrl} className={styles.imageContainer}>
                  <img alt={artist.imageUrl} className={styles.image} width={100} height={100} src={process.env.REACT_APP_BACKEND + "images/" + type + "/" + artist.imageUrl} />
                  <span>{artist.imageUrl}</span>
                </div>
                : ""
              }
              <div className={styles.imageContainer + " " + styles.addBtn}>
                <input type="file" onChange={e => handleUpdate(e)} />
              </div>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <p>Click on an image to select</p>
            {/* <Button
                          variant="secondary"
                          onClick={(_) => setShowImageSelect(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="primary"
                          onClick={(_) => setShowImageSelect(false)}
                        >
                          Save Changes
                        </Button> */}
          </Modal.Footer>
        </Modal>
      </>
    );
  }else{
    return(
      <Container className={styles.container}>
        {artist.imageUrl ?
          <div key={artist.imageUrl} className={styles.imageContainer}>
            <img alt={artist.imageUrl} className={styles.image} width={100} height={100} src={process.env.REACT_APP_BACKEND + "images/" + type + "/" + artist.imageUrl} />
            <span>{artist.imageUrl}</span>
          </div>
          : ""
        }
        <div className={styles.imageContainer + " " + styles.addBtn}>
          <input type="file" onChange={e => handleUpdate(e)} />
        </div>
      </Container>
    );
  }
}

export default FileSelector;
