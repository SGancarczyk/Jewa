export interface PanelItem {
  RequestId: number;
  idVisable: string;
  dateBegin: string;
  dateEnd: string;
}

interface PanelRowProps {
  item: PanelItem;
  rowType: "pending" | "accepted";
}

function PanelRowComponent({ item, rowType}: PanelRowProps) {
    return (
        <div>
        {rowType === "pending" && (
        <div className="panel-row-white">
        <div className="row-info-white">{item.idVisable}</div>
        <div className="row-info-white">Początek rezerwacji: {item.dateBegin}</div>
        <div className="row-info-white">Koniec rezerwacji: {item.dateEnd}</div>
        <div className="row-actions">
              <button
                className="btn info"
            >
            ℹ
            </button>
        </div>
        </div>
        )}
        {rowType === "accepted" && (
        <div className="panel-row-accepted">
            <div className="row-info-white">{item.idVisable}</div>
            <div className="row-info-white">Początek rezerwacji: {item.dateBegin}</div>
            <div className="row-info-white">Koniec rezerwacji: {item.dateEnd}</div>
            <div className="row-actions">
            <button
                className="btn info"
            >
            ℹ
            </button>
            </div>
        </div>
        )}
    </div>
    );
}

export default PanelRowComponent;