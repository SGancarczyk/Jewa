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
            <div className="panel-row-white">
            <div className="row-info-white">{item.idVisable}</div>
            <div className="row-info-white">Początek rezerwacji: {item.dateBegin}</div>
            <div className="row-info-white">Koniec rezerwacji: {item.dateEnd}</div>
            </div>
    </div>
    );
}

export default PanelRowComponent;