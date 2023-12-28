import React from 'react';
import './EditUserPage.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Component showing overall league stats and top players
function EditUserPage(){
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const [username, setUsername] = useState(user.username);
    const [firstName, setFirstName] = useState(user.first_name);
    const [lastName, setLastName] = useState(user.last_name);
    const [address, setAddress] = user.address_1 == null ? useState("") : useState(user.address_1);
    const [address2, setAddress2] = user.address_2 == null ? useState("") : useState(user.address_2);
    const [city, setCity] = user.city == null ? useState("") : useState(user.city);
    const [stateName, setStateName] = user.state == null ? useState("") : useState(user.state);
    const [zip, setZip] = user.zip == null ? useState("") : useState(user.zip);
    const [phone, setPhone] = user.phone == null ? useState("") : useState(user.phone);
    const stateLabelValues = [
        { 'label':'Alabama', 'value': 'AL' },
        { 'label':'Alaska', 'value': 'AK'},
        { 'label':'American Samoa', 'value': 'AS'},
        { 'label':'Arizona', 'value': 'AZ'},
        { 'label':'Arkansas', 'value': 'AR'},
        { 'label':'California', 'value': 'CA'},
        { 'label':'Colorado', 'value': 'CO'},
        { 'label':'Connecticut', 'value': 'CT'},
        { 'label':'Delaware', 'value': 'DE'},
        { 'label':'District of Columbia', 'value': 'DC'},
        { 'label':'States of Micronesia', 'value': 'FM'},
        { 'label':'Florida', 'value': 'FL'},
        { 'label':'Georgia', 'value': 'GA'},
        { 'label':'Guam', 'value': 'GU'},
        { 'label':'Hawaii', 'value': 'HI'},
        { 'label':'Idaho', 'value': 'ID'},
        { 'label':'Illinois', 'value': 'IL'},
        { 'label':'Indiana', 'value': 'IN'},
        { 'label':'Iowa', 'value': 'IA'},
        { 'label':'Kansas', 'value': 'KS'},
        { 'label':'Kentucky', 'value': 'KY'},
        { 'label':'Louisiana', 'value': 'LA'},
        { 'label':'Maine', 'value': 'ME'},
        { 'label':'Marshall Islands', 'value': 'MH'},
        { 'label':'Maryland', 'value': 'MD'},
        { 'label':'Massachusetts', 'value': 'MA'},
        { 'label':'Michigan', 'value': 'MI'},
        { 'label':'Minnesota', 'value': 'MN'},
        { 'label':'Mississippi', 'value': 'MS'},
        { 'label':'Missouri', 'value': 'MO'},
        { 'label':'Montana', 'value': 'MT'},
        { 'label':'Nebraska', 'value': 'NE'},
        { 'label':'Nevada', 'value': 'NV'},
        { 'label':'New Hampshire', 'value': 'NH'},
        { 'label':'New Jersey', 'value': 'NJ'},
        { 'label':'New Mexico', 'value': 'NM'},
        { 'label':'New York', 'value': 'NY'},
        { 'label':'North Carolina', 'value': 'NC'},
        { 'label':'North Dakota', 'value': 'ND'},
        { 'label':'Northern Mariana Islands', 'value': 'MP'},
        { 'label':'Ohio', 'value': 'OH'},
        { 'label':'Oklahoma', 'value': 'OK'},
        { 'label':'Oregan', 'value': 'OR'},
        { 'label':'Palau', 'value': 'PW'},
        { 'label':'Pennsilvania', 'value': 'PA'},
        { 'label':'Puerto Rico', 'value': 'PR'},
        { 'label':'Rhode Island', 'value': 'RI'},
        { 'label':'South Carolina', 'value': 'SC'},
        { 'label':'South Dakota', 'value': 'SD'},
        { 'label':'Tennessee', 'value': 'TN'},
        { 'label':'Texas', 'value': 'TX'},
        { 'label':'Utah', 'value': 'UT'},
        { 'label':'Vermont', 'value': 'VT'},
        { 'label':'Virgin Islands', 'value': 'VI'},
        { 'label':'Virginia', 'value': 'VA'},
        { 'label':'Washington', 'value': 'WA'},
        { 'label':'West Virginia', 'value': 'WV'},
        { 'label':'Wisconsin', 'value': 'WI'},
        { 'label':'Wyoming', 'value': 'WY'}
    ];

    const handleSubmit = (event) => {
        event.preventDefault();
        let newUserInfo = {
            id : user.id,
            username: username,
            firstName: firstName,
            lastName: lastName,
            address: address,
            address2: address2,
            city: city,
            state: stateName,
            zip: zip,
            phone: phone
        };
        dispatch({type: "UPDATE_USER_INFO", payload: newUserInfo})
    }

    return(
        <form className="formPanel" id="edit-user-form" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">
                Email:
                <input
                    type="text"
                    name="username"
                    value={username}
                    required
                    onChange={(event) => setUsername(event.target.value)}
                />
                </label>
            </div>
            <div>
                <label htmlFor="first-name">
                First Name:
                <input
                    type="text"
                    name="first-name"
                    value={firstName}
                    required
                    onChange={(event) => setFirstName(event.target.value)}
                />
                </label>
            </div>
            <div>
                <label htmlFor="last-name">
                Last Name:
                <input
                    type="text"
                    name="last-name"
                    value={lastName}
                    required
                    onChange={(event) => setLastName(event.target.value)}
                />
                </label>
            </div>
            <div>
                <label htmlFor="address">
                Address:
                <input
                    type="text"
                    name="address"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                />
                </label>
            </div>
            <div>
                <label htmlFor="address2">
                Address 2:
                <input
                    type="text"
                    name="address2"
                    value={address2}
                    onChange={(event) => setAddress2(event.target.value)}
                />
                </label>
            </div>
            <div>
                <label htmlFor="city">
                City:
                <input
                    type="text"
                    name="city"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                />
                </label>
            </div>
            <div>
                <label htmlFor="stateName">
                State:
                <select
                    type="text"
                    name="stateName"
                    value={stateName}
                    onChange={(event) => setStateName(event.target.value)}
                >
                    <option disabled key="disabled" value="">Select State</option>
                    {stateLabelValues.map((stateLabel)=>{
                        return <option key={stateLabel.label} value={stateLabel.value}>{stateLabel.label}</option>
                    })}
                </select>
                </label>
            </div>
            <div>
                <label htmlFor="zip">
                Zip:
                <input
                    type="text"
                    name="zip"
                    value={zip}
                    onChange={(event) => setZip(event.target.value)}
                />
                </label>
            </div>
            <div>
                <label htmlFor="phone">
                Phone:
                <input
                    type="text"
                    name="phone"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                />
                </label>
            </div>
            <br/>
            <button className="btn" type="submit">Submit</button>
        </form>
    )
}

export default EditUserPage;