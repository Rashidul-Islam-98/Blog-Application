import "./header.css";
import hompage from "../../images/homepage.jpg";

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleLg">Blog</span>
      </div>
      <img
        className="headerImg"
        src={hompage}
        alt=""
      />
    </div>
  );
}
