import React, { Component, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import LineChart from '../Chart/index'
import { observer } from 'mobx-react'
import { toJS } from 'mobx'
import { useStore } from 'stores'
import dayjs from 'dayjs'
const iconURL = 'http://openweathermap.org/img/wn/'

const WeatherList = observer(() => {
  const { wheatherStore } = useStore()
  const { forecast } = wheatherStore

  useEffect(() => {
    setInitialTemp(forecast)
  }, [forecast])

  const [temp, setTemp] = useState <number | string> (0)
  const [activClass, setActivClass] = useState <boolean> (false)

  const setInitialTemp = (forecast: any) => {
    if (forecast[0] && forecast[0].main.temp > 50) {
      const res: number|string = parseFloat(forecast[0].main?.temp)
      const convert = (res - 32) * (5 / 9) - 121
      setTemp(convert.toFixed(0))
    }
     else if (forecast[0] && forecast[0].main) {
      const res: number|string = parseFloat(forecast[0].main?.temp).toFixed(0)
      setTemp(res)
    }

    // if (forecast[0] && forecast[0].main) {
    //   const res: any = parseFloat(forecast[0].main?.temp).toFixed(0)
    //   setTemp(res)
    // }
  }

  const changeTemperageFaringate = (item: any) => {
    const res: number = parseFloat(item.main.temp) * (9 / 5) + 32
    setTemp(res.toFixed(0))
    setActivClass(prev => !prev)
  }
  const changeTemperageCelciy = (item: any) => {
    const res: number = parseFloat(item.main.temp)
    setTemp(res.toFixed(0))
    setActivClass(prev => !prev)
  }

  return (
    <>
      {forecast.length
        ? forecast?.map((item: any) => {
            return (
              <div className={styles.weatherMainContainer} key={item.id}>
                <div className={styles.weatherListContainer}>
                  <a className={styles.close}>x</a>
                  <h2 className={styles.location}>
                    {item.name},{item.sys?.country}
                  </h2>
                  <div className={styles.hederWeatherContainer}>
                    <img
                      className={styles.iconWheather}
                      src={`${iconURL}${item.weather[0].icon}.png`}
                      width="35"
                      height="35"
                    />
                    <p className={styles.weatherDiscription}>
                      {item.weather[0].description}
                    </p>
                  </div>
                </div>
                <h2 className={styles.date}>
                  {' '}
                  {dayjs.unix(item.dt).format('dd, D MMMM, HH:mm')}
                </h2>
                <div className={styles.grafic}>
                  <LineChart />
                </div>
                <div className={styles.buttonsContainer}>
                  <button
                    onClick={() => changeTemperageCelciy(item)}
                    className={
                      activClass ? styles.buttonCelciy : styles.activCelciy
                    }
                  >
                    {' '}
                    &deg;C
                  </button>
                  <button
                    className={
                      activClass ? styles.activ : styles.buttonFaringeit
                    }
                    onClick={() => changeTemperageFaringate(item)}
                  >
                    &deg;F
                  </button>
                </div>
                <p className={styles.temperature}>+{temp}</p>
                <p className={styles.temperatureFellsLike}>
                  Feels like: {item.main.feels_like.toFixed(0)} &deg;C
                </p>
                <div className={styles.rightSideContainer}>
                  <p className={styles.rightSide}>
                    Wind:{' '}
                    <span className={styles.rightSidespan}>
                      {item.wind.speed}m/s
                    </span>
                  </p>
                  <p className={styles.rightSide}>
                    Humidity:{' '}
                    <span className={styles.rightSidespan}>
                      {item.main.humidity}%
                    </span>
                  </p>
                  <p className={styles.rightSide}>
                    Pressure:{' '}
                    <span className={styles.rightSidespan}>
                      {item.main.pressure}Pa
                    </span>
                  </p>
                </div>
              </div>
            )
          })
        : null}
    </>
  )
})

export default WeatherList
