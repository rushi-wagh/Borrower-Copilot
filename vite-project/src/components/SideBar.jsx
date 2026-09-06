import {
  BarChart3,
  FileText,
  LayoutDashboard,
  Settings,
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
    label: "Negotiation Card",
    href: "#negotiation-card",
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
            <a
              key={item.label}
              href={item.href || `#${item.label.toLowerCase()}`}
              className={`nav-item ${
                item.active ? "active" : ""
              }`}
            >
              <Icon size={19} />
              <span>{item.label}</span>
            </a>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <a className="negotiation-nav-card" href="#negotiation-card">
          <span className="summary-label">Negotiation Card</span>
          <strong>Your lender-ready position</strong>
          <span className="negotiation-nav-action">Open card <span aria-hidden="true">→</span></span>
        </a>

        <button className="nav-item">
          <Settings size={19} />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
}