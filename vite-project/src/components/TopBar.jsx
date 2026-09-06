import {
  CircleHelp,
} from "lucide-react";

export default function Topbar() {
  return (
    <header className="topbar">
      <div>
        <div className="breadcrumb">
          ASSESSMENT
        </div>

        <h1>
          Build your borrowing position
        </h1>
      </div>

      <div className="topbar-actions">
        <button className="icon-button">
          <CircleHelp size={19} />
        </button>

        {/* <div className="profile">
          RW
        </div> */}
      </div>
    </header>
  );
}