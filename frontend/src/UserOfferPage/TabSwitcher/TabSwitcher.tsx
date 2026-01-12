import "./TabSwitcher.css";

export type Tab = "Oferty rezerwacji" | "Informacje o ofercie";

interface TabSwitcherProps {
  activeTab: Tab;
  onChange: (tab: Tab) => void;
}

function TabSwitcher({ activeTab, onChange }: TabSwitcherProps) {
  return (
    <div className="tabs-container-offer">
      <div className="tabs-content-offer" />

      <div className="tabs-footer-offer">
        <span
          className={`tab-offer ${activeTab === "Oferty rezerwacji" ? "active" : ""}`}
          onClick={() => onChange("Oferty rezerwacji")}
        >
          Oferty rezerwacji
        </span>

        <span
          className={`tab-offer ${activeTab === "Informacje o ofercie" ? "active" : ""}`}
          onClick={() => onChange("Informacje o ofercie")}
        >
          Informacje o ofercie
        </span>
      </div>
    </div>
  );
}

export default TabSwitcher;