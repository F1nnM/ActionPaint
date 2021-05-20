import { useState } from "react";
import { Button, Container } from "react-bootstrap";

import styles from "./FileSelector.module.scss"

function FileSelector({ creds, type, onSelect, artist, data, index }) {

  const [artists, setArtists] = useState(data);

  function handleUpload(e) {
    const files = e.target.files;
    var NameArray = [];

    for (let i = 0; i < files.length; i++){
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

  function handleAddSlide(NameArray){
    for(var i = 0; i < NameArray.length; i++){
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
        if(type === "artist"){
          handelDeleteSlide(idx);
        }
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

  function handleUpdate(e) {
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
        handleDelete(artist.imageUrl, 0);
        if(index === 999){
          handelUpdateTeam(filename);
        }else{
          handleUpdateWorker(filename);
        }
        e.target.value = "";
      })
  }

  function handleUpdateWorker(filename){
    data.members[index].imageUrl = filename;

    setArtists({...data});
   
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

  function handelUpdateTeam(filename){
    data.imageUrl = filename;

    setArtists({...data});
   
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


  if(type === "artist"){
    return (
      <Container className={styles.container}>  
        {artist.images ? 
          artist.images.map((src, idx) => {
            return (
              <div key={src} className={styles.imageContainer}>
                <img onClick={_=>onSelect(src)} alt={src} className={styles.image} width={100} height={100} src={process.env.REACT_APP_BACKEND + "images/" + type + "/" + src} />
                <Button onClick={_=>handleDelete(src, idx)} className={styles.deleteButton} variant="danger">-</Button>
                <span>{src}</span>
              </div>
            )
          })
          :""
        }
        <div className={styles.imageContainer + " " + styles.addBtn}>
          <input type="file" onChange={e => handleUpload(e)} />
        </div>
      </Container>
    ); 
  }else{
    return(
    <Container className={styles.container}>     
      {artist.imageUrl ?     
        <div key={artist.imageUrl} className={styles.imageContainer}>
          <img onClick={_=>onSelect(artist.imageUrl)} alt={artist.imageUrl} className={styles.image} width={100} height={100} src={process.env.REACT_APP_BACKEND + "images/" + type + "/" + artist.imageUrl} />
          <span>{artist.imageUrl}</span>
        </div>
        :"" 
      }
      <div className={styles.imageContainer + " " + styles.addBtn}>
        <input type="file" onChange={e => handleUpdate(e)} />
      </div>
    </Container>
    );
  }
}

export default FileSelector;
