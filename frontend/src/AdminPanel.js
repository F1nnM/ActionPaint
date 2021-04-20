import NavFrame from "./admin_components/NavFrame";
import FAQ from "./admin_components/FAQ";
import Button from "react-bootstrap/Button";

function AdminPanel({ switchToWeb }) {
  const tabs = [
    {
      label: "FAQ",
      component: <FAQ />,
    },
    {
      label: "Test",
      component: <p>Some other HTML</p>,
    },
    {
      label: "Finn's API playground",
      isBreak: true,
      component: (
        <>
          <p>For API testing:</p>
          <form
            action={process.env.REACT_APP_BACKEND + "/upload_image"}
            encType="multipart/form-data"
            method="POST"
          >
            <input type="hidden" name="imagetype" value="artist" />
            Select images:{" "}
            <input type="file" name="images" accept="image/*" multiple />
            <input type="submit" value="Upload your files" />
          </form>
        </>
      ),
    },
    {
      label: "Go back",
      component: (
        <>
          <Button onClick={switchToWeb}>Logout</Button>
        </>
      ),
    },
  ];
  return (
    <>
      <NavFrame tabs={tabs}></NavFrame>
    </>
  );
}

export default AdminPanel;
