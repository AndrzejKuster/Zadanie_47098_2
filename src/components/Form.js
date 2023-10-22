import axios from 'axios'
import config from '../config'
import { useState } from 'react'
import Select from './Select'
import './Form.css'

const Form = (props) => {
    const [name, setName] = useState()
    const [event, setEvent] = useState({key: '', val: ''})
    const [city, setCity] = useState({key: '', val: ''})
    const [error, setError] = useState([])

    const choicesEvents = [
        ['', '---'],
        ['front-end-React', 'Front End ReactJS'],
        ['full-stack-React', 'Full Stack MERN'],
        ['tester-manual', 'Tester Manualny']
    ]

    const choicesCities = [
        ['', '---'],
        ['online', 'OnLine'],
        ['warsaw', 'Warszawa'],
        ['cracow', 'Kraków']
    ]

    const saveEvent = (eventObj) => {
        console.log(eventObj)
        axios.post(config.api.url + '/events/add', eventObj, {mode: 'cors'})
        .then((res) => {
            props.getEvents();
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const resetForm = () => {
        setName('');
        setEvent({key: '', val: ''});
        setCity({key: '', val: ''});
        setError([]);
    }

    const validateForm = (e) => {
        e.preventDefault()

        let errorValidate = []

        if (name === ''){
            errorValidate.push('Wpisz Imię i Nazwisko')
        }

        if (event.key.trim() === '') {
            errorValidate.push('Wybierz szkolenie!')
        }

        if (city.key.trim() === '') {
            errorValidate.push('Wybierz miasto!')
        }


        if (errorValidate.length > 0) {
            setError(
                errorValidate.map((errorTxt, index) => {
                    return <li key={index}>{errorTxt}</li>
                })
            )
            return false;
        }

        const newEvent = {
            name: name,
            event: event,
            city: city
        }
        
        saveEvent(newEvent)

        resetForm()
    }

    const handleChangeName = (e) => {
        setName(e.target.value)
    }

    const handleChangeEventSelect = (e) => {
        console.log(e.target.options)
        setEvent({
            key: e.target.value,
            val: e.target.options[e.target.selectedIndex].innerText
        })
    }

    const handleChangeCitySelect = (e) => {
        setCity({
            key: e.target.value,
            val: e.target.options[e.target.selectedIndex].innerText
        })
    }

    return (

        <div className="formWrapper">
            <form action='#' onSubmit={validateForm}>
                <div className='wrapper'>
                    <label htmlFor="name">imię i nazwisko</label>
                    <input type="text" id="name" value={name} onChange={handleChangeName}/>
                </div>
                <div className='wrapper'>
                    <label htmlFor="event">wydarzenie</label>
                    <Select 
                        values={choicesEvents}
                        selectedValue={event.key}
                        onValueChange={handleChangeEventSelect}
                        id='event'
                    />
                </div>
                <div className='wrapper'>
                    <label htmlFor="city">Miejsce</label>
                    <Select 
                        values={choicesCities}
                        selectedValue={city.key}
                        onValueChange={handleChangeCitySelect}
                        id='event'
                    />
                </div>
                <div className='wrapper'>
                    <button type='submit' className='submit'> Zapisz na szkolenie</button>
                </div>
            </form>

            <div className="errorsWrapper">
                <ul className="errors">
                    {error}
                </ul>
            </div>

        </div>
    )
}

export default Form;