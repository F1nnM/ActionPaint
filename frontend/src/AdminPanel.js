function AdminPanel({ switchToWeb }) {
  return (
    <>
      <span>Admin stuff goes here</span>
      <button onClick={switchToWeb}>Go back</button>
      <br />
      <br />
      <br />
      <p>For API testing:</p>
      <form action={process.env.REACT_APP_BACKEND + "/upload_image"} enctype="multipart/form-data" method="POST">
        <input type="hidden" name="imagetype" value="artist" />
        Select images: <input type="file" name="images" accept="image/*" multiple />
        <input type="submit" value="Upload your files" />
      </form>
    </>
  );
}

export default AdminPanel;