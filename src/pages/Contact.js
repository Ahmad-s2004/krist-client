import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './Contact.css'



const Contact = () => {
  return (

    <>
      <Navbar />
      <div className='text-center mx-auto mt-3 rounded-2'>
        <div className='h5 fw-semibold bg-light py-2'>Contact</div>
        <div className="container bootstrap snippets bootdey mt-2">
          <section id="contact" className="padding-top-bottom">
            <div className="container bootstrap snippets bootdey">
              <div className="row">
                <form id="Highlighted-form" className="col-sm-6 col-sm-offset-3 border border-2 gray-bg rounded  mx-auto" action="contact.php" method="post" noValidate>
                  <div className="form-group">
                    <label className="control-label" htmlFor="contact-name">Name</label>
                    <div className="controls">
                      <input id="contact-name" name="contactName" placeholder="Your name" className="form-control requiredField Highlighted-label" data-new-placeholder="Your name" type="text" data-error-empty="Please enter your name" />
                      <i className="fa fa-user" />
                    </div>
                  </div>{/* End name input */}
                  <div className="form-group">
                    <label className="control-label" htmlFor="contact-mail">Email</label>
                    <div className=" controls">
                      <input id="contact-mail" name="email" placeholder="Your email" className="form-control requiredField Highlighted-label" data-new-placeholder="Your email" type="email" data-error-empty="Please enter your email" data-error-invalid="Invalid email address" />
                      <i className="fa fa-envelope" />
                    </div>
                  </div>{/* End email input */}
                  <div className="form-group">
                    <label className="control-label" htmlFor="contact-message">Message</label>
                    <div className="controls">
                      <textarea id="contact-message" name="comments" placeholder="Your message" className="form-control requiredField Highlighted-label" data-new-placeholder="Your message" rows={6} data-error-empty="Please enter your message" defaultValue={""} />
                      <i className="fa fa-comment" />
                    </div>
                  </div>{/* End textarea */}
                  <p><button name="submit" type="submit" className="btn btn-dark mt-4 btn-block" data-error-message="Error!" data-sending-message="Sending..." data-ok-message="Message Sent"><i className="fa fa-location-arrow" /> Send Message</button></p>
                  <input type="hidden" name="submitted" id="submitted" defaultValue="true" />
                </form>{/* End Highlighted-form */}
              </div>
            </div>
          </section>
        </div>

      </div>
      <Footer/>
    </>
  )
}

export default Contact