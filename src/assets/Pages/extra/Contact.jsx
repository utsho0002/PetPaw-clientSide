import React from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const Contact = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple alert for now
    Swal.fire({
        icon: 'success',
        title: 'Message Sent!',
        text: 'We will get back to you soon.',
    });
    e.target.reset(); // Clear the form
  };

  return (
    <div className="min-h-screen bg-base-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        <h1 className="text-4xl font-bold text-center mb-10">Get in Touch</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* --- LEFT: Contact Form --- */}
          <div className="card bg-base-100 shadow-xl border border-base-200">
            <div className="card-body">
                <h2 className="card-title mb-4">Send us a message</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input type="text" placeholder="Your Name" className="input input-bordered w-full" required />
                    <input type="email" placeholder="Your Email" className="input input-bordered w-full" required />
                    <input type="text" placeholder="Subject" className="input input-bordered w-full" />
                    <textarea className="textarea textarea-bordered h-32" placeholder="Your Message" required></textarea>
                    <button type="submit" className="btn btn-primary mt-2">Send Message</button>
                </form>
            </div>
          </div>

          {/* --- RIGHT: Contact Info --- */}
          <div className="flex flex-col justify-center gap-8 p-4">
             <div>
                <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
                <p className="opacity-70">Have a question? We'd love to hear from you.</p>
             </div>

             <div className="flex items-center gap-4">
                <div className="p-4 bg-primary/10 rounded-full text-primary">
                    <FaPhone className="text-2xl" />
                </div>
                <div>
                    <h4 className="font-bold">Phone</h4>
                    <p>+1 (555) 123-4567</p>
                </div>
             </div>

             <div className="flex items-center gap-4">
                <div className="p-4 bg-primary/10 rounded-full text-primary">
                    <FaEnvelope className="text-2xl" />
                </div>
                <div>
                    <h4 className="font-bold">Email</h4>
                    <p>support@pawmart.com</p>
                </div>
             </div>

             <div className="flex items-center gap-4">
                <div className="p-4 bg-primary/10 rounded-full text-primary">
                    <FaMapMarkerAlt className="text-2xl" />
                </div>
                <div>
                    <h4 className="font-bold">Location</h4>
                    <p>123 Pet Street, Animal City, NY</p>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;