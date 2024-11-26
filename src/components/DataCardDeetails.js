import './DataCardDeetails.css';

function DataCardDeetails(props) {
    const dataIcon = props.icons;
    const dataDeetails = props.Deetails;
    const dataname = props.name;
    return (
        <div className='humudity_wind_pressure_UV'>
            <div className='data_icon'>{dataIcon}</div>
            <h3 className='data_deetails'>{dataDeetails}</h3>
            <p className='data_name'>{dataname}</p>
        </div>
    );
}

export default DataCardDeetails;