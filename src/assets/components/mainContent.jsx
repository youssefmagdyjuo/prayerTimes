import Stack from '@mui/material/Stack';
import Prayer from './prayer';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import "moment/dist/locale/ar-ma"
moment.locale("ar-ma")
export default function MainContent() {
    // ______________ states _________________
    // location stats
    const [location, setLocation] = useState({ lat: null, lon: null, address: "", city: '', country: '' });
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
        Sunrise: "1:52:",
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
    // time state
    const [time, setTime] = useState(null)
    //  day state 
    const [toDay, setToDay] = useState('')
    // day in hgry date 
    const [hgry, setHgry] = useState({})
    // timer state 
    const [timer, setTimer] = useState("")
    // next prayer state 
    const [nexPrayerIndex, setNextPrayerIndex] = useState(0)
    // All pryaers 
    const allPryers = [
        { nameEn: 'Fajr', nameAr: 'الفجر' },
        { nameEn: 'Sunrise', nameAr: 'الشروق' },
        { nameEn: 'Dhuhr', nameAr: "الظهر" },
        { nameEn: 'Asr', nameAr: "العصر" },
        { nameEn: 'Maghrib', nameAr: "المغرب" },
        { nameEn: 'Isha', nameAr: "العشاء" },
    ]
    const allthing = [
        {
            countryEn: "eg",
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
            countryEn: "tn",
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
            countryEn: "ma",
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
            countryEn: "dz",
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
            countryEn: "ly",
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
            countryEn: "sa",
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
            countryEn: "ae",
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
            countryEn: "jo",
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
            countryEn: "ps",
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
        {
            countryEn: "kw",
            countryAr: "الكويت",
            capetal: { nameEn: "Kuwait City", nameAr: "مدينةالكويت" },
            cities: [
                { nameEn: "Kuwait City", nameAr: "مدينة الكويت" },
                { nameEn: "Hawally", nameAr: "حولي" },
                { nameEn: "Salmiya", nameAr: "السالمية" },
                { nameEn: "Al Ahmadi", nameAr: "الأحمدي" },
                { nameEn: "Al Jahra", nameAr: "الجهراء" },
                { nameEn: "Al Farwaniyah", nameAr: "الفروانية" },
                { nameEn: "Sabah Al Salem", nameAr: "صباح السالم" },
                { nameEn: "Al Mangaf", nameAr: "المنقف" },
                { nameEn: "Fahaheel", nameAr: "الفحيحيل" },
                { nameEn: "Mubarak Al-Kabeer", nameAr: "مبارك الكبير" },
                { nameEn: "Al Sulaibikhat", nameAr: "الصليبيخات" },
                { nameEn: "Al Qurain", nameAr: "القرين" },
                { nameEn: "Sabah Al Ahmad", nameAr: "صباح الأحمد" },
                { nameEn: "Abdullah Al-Salem", nameAr: "عبد الله السالم" },
                { nameEn: "Al Qadsiya", nameAr: "القادسية" },
                { nameEn: "Abdullah Al-Mubarak", nameAr: "عبد الله المبارك" },
                { nameEn: "Al Andalus", nameAr: "الأندلس" },
                { nameEn: "Al Ardiya", nameAr: "العارضية" },
                { nameEn: "Al Daiya", nameAr: "الدعية" }
            ]
        }


    ]

    // new way to my website via location_______________________________________________________________new *
    // get location via IP Addrees

    // useEffect(() => {
    //     getLocation()
    // }, [])
    // const getLocation = async () => {
    //     try {
    //         const respons = await axios.get('https://ipapi.co/json')
    //         const data = respons.data
    //         // search location data in allthing array 
    //         const userLocationobject = allthing.find((c) => { return c.countryEn == data.country_code })
    //         // if location is't included in allthing array 
    //         if (userLocationobject == undefined) {
    //             setcountry({ ...country, countryEn: data.country_code, countryAr: data.country_name })
    //             setCity({ nameEn: data.city, nameAr: data.city })
    //         }
    //         // if location is included in allthing array 
    //         else {
    //             setcountry({ ...country, countryEn: userLocationobject.countryEn, countryAr: userLocationobject.countryAr })
    //             set_avaliblcities(userLocationobject.cities)
    //             // if city is't included in cities array 
    //             const city_curentOpject = avaliblcities.find((city) => { return city.nameEn == data.city })
    //             if (city_curentOpject == undefined) {
    //                 setCity({ nameEn: data.city, nameAr: data.city })
    //             }
    //             // if city is included in cities array
    //             else {
    //                 setCity({ nameEn: city_curentOpject.nameEn, nameAr: city_curentOpject.nameAr })
    //             }
    //         }

    //     } catch (error) {
    //         alert(error)
    //     }
    // }

    // get location via lat and long 
    const API_URL = `https://api.opencagedata.com/geocode/v1/json?`
    const apiKey = "9a1b3d0f87a24eb486288bbceae2bb9d";
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation((prev) => ({ ...prev, lat: latitude, lon: longitude }));
                    fetchLocation(latitude, longitude);
                },
                (error) => console.error("Error getting location:", error)
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }, []);

    const fetchLocation = async (lat, lon) => {
        try {
            const response = await axios.get(`${API_URL}q=${lat}+${lon}&key=${apiKey}`);
            const formattedAddress = response.data.results[0]?.formatted || "Location not found";
            const iso = response.data.results[0].components.country_code
            const country = response.data.results[0].components.country
            const cityName = response.data.results[0].components.city
            setLocation((prev) => ({ ...prev, address: formattedAddress, country: iso, city: cityName }));

            // search location data in allthing array 
            const userLocationobject = allthing.find((c) => { return c.countryEn == iso })
            // if location is't included in allthing array but info in english
            if (userLocationobject == undefined) {
                setcountry({ ...country, countryEn: iso, countryAr: country })
                setCity({ nameEn: cityName, nameAr: cityName })
            }
            // if location is included in allthing array 
            else {
                setcountry({ ...country, countryEn: userLocationobject.countryEn, countryAr: userLocationobject.countryAr })
                set_avaliblcities(userLocationobject.cities)
                // if city is't included in cities array 
                const city_curentOpject = avaliblcities.find((city) => { return city.nameEn == cityName })
                if (city_curentOpject == undefined) {
                    setCity({ nameEn: cityName, nameAr: cityName })
                }
                // if city is included in cities array
                else {
                    setCity({ nameEn: city_curentOpject.nameEn, nameAr: city_curentOpject.nameAr })
                }
            }
        } catch (error) {
            console.error("Error fetching location name:", error);
        }
    };


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
        const data = respons.data.data;
        // update stat after api respons 
        setTimings(data.timings)
        const dateInHgry = {
            day: data.date.hijri.day,
            month: data.date.hijri.month.ar,
            year: data.date.hijri.year
        }
        setHgry(dateInHgry)
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
        setToDay(t.format('Do MMM YYYY'))
        setTime(t.format('hh:mm'))
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
            momentNow.isBefore(moment(timings.Sunrise, "hh:mm"))) {
            nextPrayer = 1
        } else if (momentNow.isAfter(moment(timings.Sunrise, "hh:mm")) &&
            momentNow.isBefore(moment(timings.Dhuhr, "hh:mm"))) {
            nextPrayer = 2
        } else if (momentNow.isAfter(moment(timings.Dhuhr, "hh:mm")) &&
            momentNow.isBefore(moment(timings.Asr, "hh:mm"))) {
            nextPrayer = 3
        } else if (momentNow.isAfter(moment(timings.Asr, "hh:mm")) &&
            momentNow.isBefore(moment(timings.Maghrib, "hh:mm"))) {
            nextPrayer = 4
        } else if (momentNow.isAfter(moment(timings.Maghrib, "hh:mm")) &&
            momentNow.isBefore(moment(timings.Isha, "hh:mm"))) {
            nextPrayer = 5
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
                    <div className='date'>
                        <p>{toDay}</p>
                        <p>{time}</p>
                        <p>{`${hgry.day} ${hgry.month} ${hgry.year}`}</p>
                    </div>
                    {
                        location.lat && location.lon ? (
                            <h1>{country.countryAr} | {city.nameAr}</h1>
                        ) : (<h1>جارٍ تحديد موقعك...</h1>)
                    }

                </div>
                <div className='header_left'>
                    <h2>متبقي حتى صلاة {allPryers[nexPrayerIndex].nameAr}</h2>
                    <h1>{timer}</h1>
                </div>
            </section>
            {/* cards  */}
            <Stack className='cards'>
                <Prayer time={timings.Fajr} name="الفجر" imge="./imgs/fgr.jpg" />
                <Prayer time={timings.Sunrise} name="الشروق" imge="./imgs/Sunrise.jpg" />
                <Prayer time={timings.Dhuhr} name="الظهر" imge="./imgs/duhr.jpg" />
                <Prayer time={timings.Asr} name="العصر" imge="./imgs/asr.jpg" />
                <Prayer time={timings.Maghrib} name="المغرب" imge="./imgs/mgrb.jpg" />
                <Prayer time={timings.Isha} name="العشاء" imge="./imgs/isha.jpg" />
            </Stack>
            {/* selecter  */}
            <div className='selecters'>

                <div>
                    <label className="select" htmlFor="country">
                        <select id="country" required
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
                    <label className="select" htmlFor="city">
                        <select id="city" required
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
