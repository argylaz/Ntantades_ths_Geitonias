import React, { useState } from 'react';
import '../StyleSheets/Register.css'
import { FIREBASE_DB, FIREBASE_AUTH } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default function Register() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  
  async function SignUp(event) {
    event.preventDefault(); // Prevent default form submission
    
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      const user = res.user;

      console.log("User registered:", user);

      // Save Added info to firestore
      await setDoc(doc(FIREBASE_DB, "users", user.uid), {
        firstname: firstname,
        lastname: lastname,
        age: age,
        email: email,
        phone: phone,
        createdAt: new Date().toISOString(),
      });

      window.location.href = "/";
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }
  

    return(
      <div className='register'>
        <form onSubmit={SignUp} className='register-container'>
            <h2>Register</h2>

            {/* Field for firstname */}
            <div className='register-row'>
            <label>FirstName:</label>
            &nbsp;&nbsp;&nbsp;
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            </div>

            {/* Field for lastname */}
            <div className='register-row'>
            <label>LastName:</label>
            &nbsp;&nbsp;&nbsp;
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            </div>

            {/* Field for Age */}
            <div className='register-row'>
            <label>Age:</label>
            &nbsp;&nbsp;&nbsp;
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
            </div>

            {/* Field for phone number */}
            <div className='register-row'>
              <label>Phone:</label>
              &nbsp;&nbsp;&nbsp;
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {/* Field for Email */}
            <div className='register-row'>
                <label>Email:</label>
                &nbsp;&nbsp;&nbsp;
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            {/* Field for password */}
            <div className='register-row'>
                <label>Password:</label>
                &nbsp;&nbsp;&nbsp;
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button type='submit'> {loading ? 'Creating user' : 'Register'}</button>
            <a href='/'>Already have an Account?</a>
        </form>
      </div>
    )
}