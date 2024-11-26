import './ForecastData.css';

function ForecastData(props) {
    const Forecasticon = props.icon;
    const Forecasttemperature = props.temprature;
    const Forecastdate = props.date;

    return (
        <div className='forecast_icon_temp_date'>
            <div className='forecast_icon'>{Forecasticon}</div>
            <p className='forecast_temp'>{Forecasttemperature}</p>
            <p className='forecast_date'>{Forecastdate}</p>
        </div>
    );
}


export default ForecastData;