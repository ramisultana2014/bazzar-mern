import Wrapper from "../wrapper/ProfilePage";
import coverWhite from "../assets/coverWhite.png";
import coverDark from "../assets/coverDark.png";
import bazzar from "../assets/logo.svg";
import bazzarDark from "../assets/darklogo.svg";
import { useAppSelector } from "../hooks";
import Menus from "../components/Menus";
import Modal from "../components/Modal";
import { UploadImage, UserProducts } from "../components";
import DeleteImage from "../components/DeleteImage";

function Profile() {
  // const [isDarkTheme, setIsDarkTheme] = useState(
  //   localStorage.getItem("darkTheme") === "true"
  // );

  const darkThemeFromRedux = useAppSelector(
    (store) => store.userState.isDarkTheme
  );
  const userInRedux = useAppSelector((state) => state.userState.user);
  //console.log(userInRedux);

  return (
    <Menus>
      <Wrapper>
        <div className="image-container">
          <Modal>
            <Menus.ToggleForImageMenuList name="cover">
              {userInRedux.storeCoverPicture ? (
                <img
                  src={userInRedux.storeCoverPicture}
                  alt="cover"
                  className="cover-photo"
                />
              ) : (
                <img
                  src={darkThemeFromRedux ? coverDark : coverWhite}
                  alt="cover"
                  className="cover-photo"
                />
              )}
            </Menus.ToggleForImageMenuList>
            <Menus.List id="cover">
              <Modal.Open nameToOpenWindow="change-image">
                {/* children of Modal.Open must be button du to clone to add the onclick so we can match name in Modal.Window */}
                <button className="button">Change cover image</button>
              </Modal.Open>
              <Modal.Open nameToOpenWindow="delete-image">
                {/* children of Modal.Open must be button du to clone to add the onclick so we can match name in Modal.Window */}
                <button className="button">Delete Image</button>
              </Modal.Open>
            </Menus.List>
            <Modal.Window name="change-image">
              {/* inside Modal.Window we put the component that will handle logic like update - delete, update */}
              {/* closeWindow is now pass to that component du to clone so to use we write it as props in this component */}
              <UploadImage imageType="storeCoverPicture" />
            </Modal.Window>
            <Modal.Window name="delete-image">
              {/* inside Modal.Window we put the component that will handle logic like update - delete, update */}
              {/* closeWindow is now pass to that component du to clone so to use we write it as props in this component */}
              <DeleteImage
                imageType="storeCoverPicture"
                imageID={userInRedux.storeCoverPictureID}
              />
            </Modal.Window>
          </Modal>
          <Modal>
            <Menus.ToggleForImageMenuList name="profile">
              {userInRedux.storeProfilePicture ? (
                <img
                  src={userInRedux.storeProfilePicture}
                  alt="profile photo"
                  className="profileImage"
                />
              ) : (
                <img
                  src={darkThemeFromRedux ? bazzarDark : bazzar}
                  alt="profile photo"
                  className="profileImage"
                />
              )}
            </Menus.ToggleForImageMenuList>
            <Menus.List id="profile">
              <Modal.Open nameToOpenWindow="change-image">
                {/* children of Modal.Open must be button du to clone to add the onclick so we can match name in Modal.Window */}
                <button className="button">Change profile image</button>
              </Modal.Open>
              <Modal.Open nameToOpenWindow="delete-image">
                {/* children of Modal.Open must be button du to clone to add the onclick so we can match name in Modal.Window */}
                <button className="button">Delete Image</button>
              </Modal.Open>
            </Menus.List>
            <Modal.Window name="change-image">
              {/* inside Modal.Window we put the component that will handle logic like update - delete, update */}
              {/* closeWindow is now pass to that component du to clone so to use we write it as props in this component */}
              <UploadImage imageType="storeProfilePicture" />
            </Modal.Window>
            <Modal.Window name="delete-image">
              {/* inside Modal.Window we put the component that will handle logic like update - delete, update */}
              {/* closeWindow is now pass to that component du to clone so to use we write it as props in this component */}
              <DeleteImage
                imageType="storeProfilePicture"
                imageID={userInRedux.storeProfilePictureID}
              />
            </Modal.Window>
          </Modal>
        </div>
        {/* <p className="tooltip-image-text">click at image to change it</p> */}

        <UserProducts />
      </Wrapper>
    </Menus>
  );
}
export default Profile;
