import { useEffect, useState } from 'react'
import Loader from 'react-loaders'
import { useRef } from 'react'
import emailjs from '@emailjs/browser'
import AnimatedLetters from '../AnimatedLetters'
import './index.scss'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Contact = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const form = useRef()
  const contactArray = 'Select Objection'.split('')

  useEffect(() => {
    return setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)
  }, [])

  const sendEmail = (e) => {
    e.preventDefault()

    emailjs
      .sendForm(
        process.env.REACT_APP_EMIAL_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_PUBLIC_KEY
      )
      .then(
        () => {
          toast.success('Message successfully sent!', {
            position: 'bottom-center',
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
          })
          const timeout = setTimeout(() => {
            window.location.reload(false)
          }, 3900)

          return () => clearTimeout(timeout)
        },
        () => {
          toast.error('Failed to send the message, please try again', {
            position: 'bottom-center',
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
          })
        }
      )
  }

  return (
    <>
      <div className="container contact-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={contactArray}
              idx={15}
            />
          </h1>
          <p>
            촬영할 객체를 선택하세요.
          </p>
          <div className="contact-form">
            <form ref={form} onSubmit={console.log("확인")}>
              <ul>
                <li>
                  <select class="select_style">
                    <option value="test1">테스트1</option>
                    <option value="test2">테스트2</option>
                    <option value="test3">테스트3</option>
                    <option value="test4">테스트4</option>
                  </select>
                </li>
                <li>
                  <select class="select_style">
                    <option value="test1">테스트1</option>
                    <option value="test2">테스트2</option>
                    <option value="test3">테스트3</option>
                    <option value="test4">테스트4</option>
                  </select>
                </li>
                <li>
                  <input
                    placeholder="Num"
                    type="number"
                    name="Num"
                    required
                  />
                </li>
                <li>
                  <input type="submit" className="flat-button" value="SEND" />
                </li>
              </ul>
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default Contact
