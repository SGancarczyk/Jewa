export interface PanelItem {
  RequestId: number;
  idVisable: string;
  dateBegin: string;
  dateEnd: string;
}

interface PanelRowProps {
  item: PanelItem;
  rowType: "pending" | "accepted";
  onAccept: (RequestId: number) => void;
  onReject: (RequestId: number) => void;
}

function PanelRowComponent({ item, rowType, onAccept, onReject }: PanelRowProps) {
    return (
        <div>
        {rowType === "pending" && (
        <div className="panel-row">
        <div className="row-info">{item.idVisable}</div>
        <div className="row-info">Początek rezerwacji: {item.dateBegin}</div>
        <div className="row-info">Koniec rezerwacji: {item.dateEnd}</div>
            <div className="row-actions">
            <button
                className="btn accept"
                onClick={() => onAccept(item.RequestId)}
            >
            ✔
            </button>
            <button
                className="btn reject"
                onClick={() => onReject(item.RequestId)}
            >
            ✖
            </button>
        </div>
        </div>
        )}
        {rowType === "accepted" && (
        <div className="panel-row-accepted">
            <div className="row-info">{item.idVisable}</div>
            <div className="row-info">Początek rezerwacji: {item.dateBegin}</div>
            <div className="row-info">Koniec rezerwacji: {item.dateEnd}</div>
            <div className="row-actions">
            <button
                className="btn info"
                onClick={() => onAccept(item.RequestId)}
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