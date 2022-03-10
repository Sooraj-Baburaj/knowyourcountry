import './form.css';
import { useState } from 'react'; 
import axios from 'axios';

const Form = ({setData}) => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        age: false, 
        region: "Africa",
        checkTerms: false 
    });
    const [error, setError] = useState(true);
    const [loading, setLoading] = useState(false);
    const [validEmail, setValidEmail] = useState(true);

    const validateAge = (e) => {
        let userDOB = e.target.value
        let d = new Date(userDOB)
        let timeNow = new Date().getTime()/1000
        let timeOfDOB = d.getTime()/1000;

        let secs = timeNow - timeOfDOB

        console.log(secs)

        if(secs > 567648000) {
            setFormData({...formData, age: true})
        } else {
            setFormData({...formData, age: false})
        }
    };

    const validateEmail = (e) => {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

        if (!pattern.test(e.target.value)) {  
            setValidEmail(false)
        } else {
            setValidEmail(true)
        }
    };

    const handleSubmit = () => {
        if(formData.username !== "John" && formData.username !== "John Doe" ) {
            setError("Invalid username")
        } else if(!validEmail) {
            setError("Enter a valid E-mail")
        } else if(!formData.age) {
            setError("You are not 18!")
        } else if(!formData.checkTerms) {
            setError("Please accept the terms and conditions")
        } else if(!formData.username && !formData.email && !formData.checkTerms) {
            setError("Fill all fields")
        } else {
            setError("")
            setLoading(true)
            axios.get(`https://restcountries.com/v3.1/region/${formData.region}`)
            .then((r) => {setData(r.data); setLoading(false)})
            .catch(() => setError("An error occured, try again."))
        }
    }
  return (
    <div className="Form">
        <div className="inputbox">
        <label htmlFor="username">Username: </label>
        <input type="text" onChange={(e) => setFormData({...formData, username: e.target.value})} value={formData.username} id="username" />
        </div>
        <div className="inputbox">
        <label htmlFor="email">Email: </label>
        <input type="text" onChange={(e) => {setFormData({...formData, email: e.target.value}); validateEmail(e)}} value={formData.email} id="email" style={{boxShadow: !validEmail && "0 0 0 2px rgba(255,0,0,0.8)"}} />
        </div>
        <div className="inputbox">
        <label htmlFor="DOB">DOB: </label>
        <input type="date" onChange={(e) => validateAge(e)}  id="DOB" />
        </div>
        <div className="inputbox">
        <label htmlFor="region">Region: </label>
        <select name="regions" onChange={(e) => setFormData({...formData, region: e.target.value})} value={formData.region} id="regions">
            <option value="Africa" htmlFor="regions">Africa</option>
            <option value="Americas" htmlFor="regions">Americas</option>
            <option value="Asia" htmlFor="regions">Asia</option>
            <option value="Europe" htmlFor="regions">Europe</option>
            <option value="Oceania" htmlFor="regions">Oceania</option>
        </select>
        </div>
        <div className="inputboxCheck">
        <input type="checkbox" onChange={(e) => setFormData({...formData, checkTerms: e.target.checked})} value={formData.checkTerms} id="checkterms" /> 
        <label htmlFor="checkterms">I accept the terms and conditions</label>  
        </div>     
        <div className="inputbox">
            <button onClick={handleSubmit} >{!loading ? "Submit" : <span className="material-icons" style={{animation: "loadingAnim 1s infinite"}}>motion_photos_on</span>}</button>
        </div>
        <div className="Form-error">{error}</div>
    </div>
  )
}

export default Form;