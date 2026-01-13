import "./TabSwitcher.css";

export type Tab = "Ogłoszenia" | "Opinie" | "Rezerwacje";

interface TabSwitcherProps {
  activeTab: Tab;
  onChange: (tab: Tab) => void;
}

function TabSwitcher({ activeTab, onChange }: TabSwitcherProps) {
  return (
    <div className="tabs-container">
      <div className="tabs-content" />

      <div className="tabs-footer">
        <span
          className={`tab ${activeTab === "Ogłoszenia" ? "active" : ""}`}
          onClick={() => onChange("Ogłoszenia")}
        >
          Ogłoszenia
        </span>

        <span
          className={`tab ${activeTab === "Opinie" ? "active" : ""}`}
          onClick={() => onChange("Opinie")}
        >
          Opinie
        </span>

        <span
          className={`tab ${activeTab === "Rezerwacje" ? "active" : ""}`}
          onClick={() => onChange("Rezerwacje")}
        >
          Rezerwacje
        </span>
      </div>
    </div>
  );
}

export default TabSwitcher;