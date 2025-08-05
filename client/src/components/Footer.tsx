import type { User } from "../context/userSlice";

function Footer({ userFromRedux }: { userFromRedux: User }) {
  const firstLetterOFUserEmail = userFromRedux.email.charAt(0).toUpperCase();

  //css in AppLayOut.ts
  return (
    <footer>
      <div className="user-info">
        <p className="firstLetterOFUserEmail">{firstLetterOFUserEmail}</p>
        <p>{userFromRedux.email}</p>
      </div>
      <p className="copy-right">
        &copy; Copyright {new Date().getFullYear()} by Rami Sultana
      </p>
    </footer>
  );
}
export default Footer;
