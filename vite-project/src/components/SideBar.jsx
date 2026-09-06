import {
  BarChart3,
  BookOpen,
  FileText,
  LayoutDashboard,
  Settings,
  ShieldCheck,
} from "lucide-react";

const navigation = [
  {
    icon: LayoutDashboard,
    label: "Overview",
    active: true,
  },
  {
    icon: BarChart3,
    label: "Assessment",
  },
  {
    icon: FileText,
    label: "My Negotiation Card",
  },
  {
    icon: BookOpen,
    label: "Borrowing Guide",
  },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">
          <BarChart3 size={20} strokeWidth={2.5} />
        </div>

        <div>
          <div className="brand-name">
            Borrower Copilot
          </div>

          <div className="brand-beta">
            BETA
          </div>
        </div>
      </div>

      <p className="brand-description">
        Know your numbers
        <br />
        before you borrow.
      </p>

      <nav className="navigation">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              className={`nav-item ${
                item.active ? "active" : ""
              }`}
            >
              <Icon size={19} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <div className="privacy-card">
          <ShieldCheck size={18} />

          <div>
            <strong>
              Your information stays private
            </strong>

            <span>
              This assessment uses only what you choose
              to share.
            </span>
          </div>
        </div>

        <button className="nav-item">
          <Settings size={19} />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
}