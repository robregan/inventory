import React, { useState } from 'react'
import { FaEnvelope, FaPhoneAlt, FaTwitter } from 'react-icons/fa'
import Card from '../../components/card/Card'
import './Contact.scss'
import { GoLocation } from 'react-icons/go'
import { toast } from 'react-toastify'
import { BACKEND_URL } from '../../services/authService'
import axios from 'axios'

const Contact = () => {
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const data = {
    subject,
    message,
  }

  const sendEmail = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${BACKEND_URL}/api/contact`, data)
      setSubject('')
      setMessage('')
      toast.success(response.data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className='contact'>
      <h3 className='--mt'>Contact Us</h3>
      <div className='section'>
        <form onSubmit={sendEmail}>
          <Card cardClass='card'>
            <label>Subject:</label>
            <input
              type='text'
              name='subject'
              placeholder='Subject'
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <label>Message:</label>
            <textarea
              cols='30'
              rows='10'
              name='message'
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button className='--btn --btn-primary'>Send Message</button>
          </Card>
        </form>
        <div className='details'>
          <Card cardClass='card2'>
            <h3>Our Contact Information</h3>
            <p>Fill out the form or contact us via other ways listed below</p>

            <div className='icons'>
              <span>
                <FaPhoneAlt />
                <p>+802 867 5309</p>
              </span>
              <span>
                <FaEnvelope />
                <p>rsr@robregan.dev</p>
              </span>
              <span>
                <GoLocation />
                <p>Burlington, Vermont</p>
              </span>
              <span>
                <FaTwitter />
                <p>@rob_regan_dev</p>
              </span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Contact
