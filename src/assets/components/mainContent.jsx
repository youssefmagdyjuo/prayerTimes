import Stack from '@mui/material/Stack';
import Prayer from './prayer';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import "moment/dist/locale/ar-ma"
moment.locale("ar-ma")
export default function MainContent() {
    // ______________ states _________________
    // avaliblcities state 
    const [avaliblcities, set_avaliblcities] = useState([
        { nameEn: 'Alexandria', nameAr: 'الأسكندرية' },
        { nameEn: 'Cairo', nameAr: "القاهرة" },
        { nameEn: 'Ismailia', nameAr: "الاسماعيلية" },
        { nameEn: 'Gizeh', nameAr: "الجيزة" },
        { nameEn: 'Aswan', nameAr: "أسوان" },
        { nameEn: 'Luxor', nameAr: "الأقصر" },
        { nameEn: 'Damanhur', nameAr: "دمنهور" },
        { nameEn: 'Shubra El-Kheima', nameAr: "شبرا الخيمة" },
        { nameEn: 'Port Said', nameAr: "بور سعيد" },
    ])
    // country state 
    const [country, setcountry] = useState({
        countryEn: 'EG',
        countryAr: ''
    })
    // Timing State
    const [timings, setTimings] = useState({
        Fajr: "04:57",
        Dhuhr: "11:34",
        Asr: "14:30",
        Maghrib: "16:50",
        Isha: "18:20",
    })
    // City Stat (whitch city is choosen)
    const [city, setCity] = useState({
        nameAr: '',
        nameEn: "Alexandria"
    })
    // time and day state 
    const [toDay, setToDay] = useState('')
    // timer state 
    const [timer, setTimer] = useState("")
    // next prayer state 
    const [nexPrayerIndex, setNextPrayerIndex] = useState(0)
    // All pryaers 
    const allPryers = [
        { nameEn: 'Fajr', nameAr: 'الفجر' },
        { nameEn: 'Dhuhr', nameAr: "الظهر" },
        { nameEn: 'Asr', nameAr: "العصر" },
        { nameEn: 'Maghrib', nameAr: "المغرب" },
        { nameEn: 'Isha', nameAr: "العشاء" },
    ]
    const allthing = [
        {
            countryEn: "EG",
            countryAr: "مصر",
            capetal: { nameEn: "Cairo", nameAr: "القاهرة" },
            cities: [
                { nameEn: "Alexandria", nameAr: "الأسكندرية" },
                { nameEn: "Cairo", nameAr: "القاهرة" },
                { nameEn: "Ismailia", nameAr: "الاسماعيلية" },
                { nameEn: "Gizeh", nameAr: "الجيزة" },
                { nameEn: "Aswan", nameAr: "أسوان" },
                { nameEn: "Luxor", nameAr: "الأقصر" },
                { nameEn: "Damanhur", nameAr: "دمنهور" },
                { nameEn: "Shubra El-Kheima", nameAr: "شبرا الخيمة" },
                { nameEn: "Port Said", nameAr: "بور سعيد" }
            ]
        },
        {
            countryEn: "TN",
            countryAr: "تونس",
            capetal: { nameEn: "Tunis", nameAr: "تونس" },
            cities: [
                { nameEn: "Tunis", nameAr: "تونس" },
                { nameEn: "Sfax", nameAr: "صفاقس" },
                { nameEn: "Sousse", nameAr: "سوسة" },
                { nameEn: "Kairouan", nameAr: "القيروان" }
            ]
        },
        {
            countryEn: "MA",
            countryAr: "المغرب",
            capetal: { nameEn: "Rabat", nameAr: "الرباط" },
            cities: [
                { nameEn: "Casablanca", nameAr: "الدار البيضاء" },
                { nameEn: "Rabat", nameAr: "الرباط" },
                { nameEn: "Fes", nameAr: "فاس" },
                { nameEn: "Marrakesh", nameAr: "مراكش" },
                { nameEn: "Tangier", nameAr: "طنجة" }
            ]
        },
        {
            countryEn: "DZ",
            countryAr: "الجزائر",
            capetal: { nameEn: "Algiers", nameAr: "الجزائر" },
            cities: [
                { nameEn: "Algiers", nameAr: "الجزائر" },
                { nameEn: "Oran", nameAr: "وهران" },
                { nameEn: "Constantine", nameAr: "قسنطينة" },
                { nameEn: "Annaba", nameAr: "عنابة" }
            ]
        },
        {
            countryEn: "LY",
            countryAr: "ليبيا",
            capetal: { nameEn: "Tripoli", nameAr: "طرابلس" },
            cities: [
                { nameEn: "Tripoli", nameAr: "طرابلس" },
                { nameEn: "Benghazi", nameAr: "بنغازي" },
                { nameEn: "Misrata", nameAr: "مصراتة" },
                { nameEn: "Sabha", nameAr: "سبها" }
            ]
        },
        {
            countryEn: "SA",
            countryAr: "السعودية",
            capetal: { nameEn: "Riyadh", nameAr: "الرياض" },
            cities: [
                { nameEn: "Riyadh", nameAr: "الرياض" },
                { nameEn: "Jeddah", nameAr: "جدة" },
                { nameEn: "Mecca", nameAr: "مكة المكرمة" },
                { nameEn: "Medina", nameAr: "المدينة المنورة" },
                { nameEn: "Dammam", nameAr: "الدمام" },
                { nameEn: "Taif", nameAr: "الطائف" }
            ]
        },
        {
            countryEn: "AE",
            countryAr: "الإمارات",
            capetal: { nameEn: "Abu Dhabi", nameAr: "أبو ظبي" },
            cities: [
                { nameEn: "Abu Dhabi", nameAr: "أبو ظبي" },
                { nameEn: "Dubai", nameAr: "دبي" },
                { nameEn: "Sharjah", nameAr: "الشارقة" },
                { nameEn: "Ajman", nameAr: "عجمان" },
                { nameEn: "Al Ain", nameAr: "العين" }
            ]
        },
        {
            countryEn: "JO",
            countryAr: "الأردن",
            capetal: { nameEn: "Amman", nameAr: "عمان" },
            cities: [
                { nameEn: "Amman", nameAr: "عمان" },
                { nameEn: "Zarqa", nameAr: "الزرقاء" },
                { nameEn: "Irbid", nameAr: "إربد" },
                { nameEn: "Aqaba", nameAr: "العقبة" }
            ]
        },
        {
            countryEn: "PS",
            countryAr: "فلسطين",
            capetal: { nameEn: "Jerusalem", nameAr: "القدس" },
            cities: [
                { nameEn: "Jerusalem", nameAr: "القدس" },
                { nameEn: "Gaza", nameAr: "غزة" },
                { nameEn: "Ramallah", nameAr: "رام الله" },
                { nameEn: "Nablus", nameAr: "نابلس" },
                { nameEn: "Hebron", nameAr: "الخليل" },
                { nameEn: "Bethlehem", nameAr: "بيت لحم" },
                { nameEn: "Jenin", nameAr: "جنين" },
                { nameEn: "Tulkarm", nameAr: "طولكرم" },
                { nameEn: "Qalqilya", nameAr: "قلقيلية" }
            ]
        },


    ]

    // new way to my website via location_______________________________________________________________new *
    useEffect(() => {
        getLocation()
    }, [])
    const getLocation = async () => {
        try {
            const respons = await axios.get('https://ipapi.co/json')
            const data = respons.data
            // search location data in allthing array 
            const userLocationobject = allthing.find((c) => { return c.countryEn == data.country_code })
            // if location is't included in allthing array 
            if (userLocationobject == undefined) {
                setcountry({ ...country, countryEn: data.country_code, countryAr: data.country_name })
                setCity({ nameEn: data.city, nameAr: data.city })
            }
            // if location is included in allthing array 
            else {
                setcountry({ ...country, countryEn: userLocationobject.countryEn, countryAr: userLocationobject.countryAr })
                set_avaliblcities(userLocationobject.cities)
                // if city is't included in cities array 
                const city_curentOpject = avaliblcities.find((city) => { return city.nameEn == data.city })
                if (city_curentOpject == undefined) {
                    setCity({ nameEn: data.city, nameAr: data.city })
                }
                // if city is included in cities array
                else {
                    setCity({ nameEn: city_curentOpject.nameEn, nameAr: city_curentOpject.nameAr })
                }
            }

        } catch (error) {
            alert(error)
        }
    }
    // handel coutry function
    const handelcoutry = (e) => {
        const country_curentOpject = allthing.find((c) => {
            return c.countryEn == e.target.value
        })
        setcountry({ ...country, countryEn: country_curentOpject.countryEn, countryAr: country_curentOpject.countryAr })
        set_avaliblcities(country_curentOpject.cities)
        setCity({ ...city, nameEn: country_curentOpject.capetal.nameEn, nameAr: country_curentOpject.capetal.nameAr })
    };

    // api request ------------------------------------>
    const getTimings = async () => {
        const respons = await axios.get(
            `https://api.aladhan.com/v1/timingsByCity?country=${country.countryEn}&city=${city.nameEn}`
        );
        // update stat after api respons 
        setTimings(respons.data.data.timings)
    }
    // api request by useEffect
    useEffect(() => {
        getTimings();
    }, [city])

    // function handle selector to choose city
    const handlCity = (e) => {
        const city_curentOpject = avaliblcities.find((city) => {
            return city.nameEn == e.target.value
        })
        setCity(city_curentOpject)
    };
    // useing timer 
    useEffect(() => {
        let x = setInterval(() => {
            setUpCountDownTimer();
        }, 1000);
        // refresh the time and day state  
        const t = moment()
        setToDay(t.format('Do MMM YYYY | hh:mm'))
        return () => {
            clearInterval(x)
        }
    }, [timings])
    const setUpCountDownTimer = () => {
        // time now 
        const momentNow = moment();
        let nextPrayer = null;
        // cheack witch the next prayer is
        if (momentNow.isAfter(moment(timings.Fajr, "hh:mm")) &&
            momentNow.isBefore(moment(timings.Dhuhr, "hh:mm"))) {
            nextPrayer = 1
        } else if (momentNow.isAfter(moment(timings.Dhuhr, "hh:mm")) &&
            momentNow.isBefore(moment(timings.Asr, "hh:mm"))) {
            nextPrayer = 2
        } else if (momentNow.isAfter(moment(timings.Asr, "hh:mm")) &&
            momentNow.isBefore(moment(timings.Maghrib, "hh:mm"))) {
            nextPrayer = 3
        } else if (momentNow.isAfter(moment(timings.Maghrib, "hh:mm")) &&
            momentNow.isBefore(moment(timings.Isha, "hh:mm"))) {
            nextPrayer = 4
        } else {
            nextPrayer = 0
        }
        setNextPrayerIndex(nextPrayer)
        // timer part with next pryer 
        const nextObject = allPryers[nextPrayer]
        const nextPrayerTime = timings[nextObject.nameEn]
        const nextPrayerTimeMoment = moment(nextPrayerTime, "hh:mm")
        // الوقت الباقى 
        let remainingtTime = nextPrayerTimeMoment.diff(momentNow)
        if (remainingtTime < 0) {
            const midnigthDiff = moment("23:59:59", "hh:mm:ss").diff(momentNow)
            const faher_midnigthDiff = nextPrayerTimeMoment.diff(moment("00:00:00", "hh:mm:ss"))
            const totalDiff = midnigthDiff + faher_midnigthDiff
            remainingtTime = totalDiff
        }
        // صيغة مفهومة 
        const duration_remainingtTime = moment.duration(remainingtTime)
        setTimer(`${duration_remainingtTime.seconds()} : ${duration_remainingtTime.minutes()} : ${duration_remainingtTime.hours()}`)
    }
    // ______________________________________________________Main Return_________________________________________________
    return (
        <div>
            {/* header  */}
            <section className='header'>
                <div className='header_rigth'>
                    <h2>{toDay}</h2>
                    <h1>{country.countryAr} | {city.nameAr}</h1>
                </div>
                <div className='header_left'>
                    <h2>متبقي حتى صلاة {allPryers[nexPrayerIndex].nameAr}</h2>
                    <h1>{timer}</h1>
                </div>
            </section>
            {/* cards  */}
            <Stack className='cards'>
                <Prayer time={timings.Fajr} name="الفجر" imge="./imgs/fgr.jpg" />
                <Prayer time={timings.Dhuhr} name="الظهر" imge="./imgs/duhr.jpg" />
                <Prayer time={timings.Asr} name="العصر" imge="./imgs/asr.jpg" />
                <Prayer time={timings.Maghrib} name="المغرب" imge="./imgs/mgrb.jpg" />
                <Prayer time={timings.Isha} name="العشاء" imge="./imgs/isha.jpg" />
            </Stack>
            {/* selecter  */}
            <div className='selecters'>

                <div>
                    <label className="select" htmlFor="slct">
                        <select id="slct" required
                        onChange={handelcoutry}>
                            <option disabled selected value="">
                                البلد
                            </option>
                            {
                                // create <MenuItem> to every country in array (allthing)
                                allthing.map((c, index) => {
                                    return (
                                        <option key={index} value={c.countryEn}>{c.countryAr}</option>
                                    )
                                })
                            }
                        </select>
                        <svg>
                            <use xlinkHref="#select-arrow-down" />
                        </svg>
                    </label>
                    <svg className="sprites">
                        <symbol id="select-arrow-down" viewBox="0 0 10 6">
                            <polyline points="1 1 5 5 9 1" />
                        </symbol>
                    </svg>
                </div>
                {/* city__________________________  */}
                <div>
                    <label className="select" htmlFor="slct">
                        <select id="slct" required
                        onChange={handlCity}>
                            <option disabled selected value="">
                                المدينة
                            </option>
                            {
                                // create <MenuItem> to every city in all cities array (avaliblcities)
                                avaliblcities.map((city, index) => {
                                    return (
                                        <option key={index} value={city.nameEn}>{city.nameAr}</option>
                                    )
                                })
                            }
                        </select>
                        <svg>
                            <use xlinkHref="#select-arrow-down" />
                        </svg>
                    </label>
                    <svg className="sprites">
                        <symbol id="select-arrow-down" viewBox="0 0 10 6">
                            <polyline points="1 1 5 5 9 1" />
                        </symbol>
                    </svg>
                </div>

            </div>
        </div>
    )
}
