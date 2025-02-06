
export default function Prayer({name,time,imge}) {
    return (
        <div className='card'>
            <div className="prayerImg">
            <img src={imge} alt="Avatar" style={{width:'100%'}}/>
            </div>
            <h3 className="prayerName" >
            {name}
            </h3>
            <h1 className="prayerTime"> 
            {time}
            </h1>
        </div>
    );
}
