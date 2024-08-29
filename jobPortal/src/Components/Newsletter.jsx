import React, { useRef, useState } from 'react';
import { FaEnvelopeOpenText, FaRocket } from 'react-icons/fa6';
import { motion } from 'framer-motion';

const Newsletter = () => {
  const fileInputRef = useRef(null);
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const buttonVariants = {
    hover: {
      scale: 1.1,
      textShadow: "0px 0px 8px rgb(255,255,255)",
      boxShadow: "0px 0px 8px rgb(255,255,255)",
      transition: {
        duration: 0.3,
        yoyo: Infinity,
      },
    },
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Uploaded file:', file);

      const formData = new FormData();
      formData.append('resume', file);

      try {
        const response = await fetch('http://localhost:5000/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          alert('Resume uploaded successfully!');
        } else {
          alert('Failed to upload resume.');
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('An error occurred while uploading the resume.');
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setEmail("");
    }, 2000);
  };

  return (
    <motion.div
      variants={item}
      whileHover={{ scale: 1.1 }}
      whileInView={{ y: 0, opacity: 1 }}
      initial={{ y: -300, opacity: 0 }}
      transition={{ duration: 2 }}
      className="flex items-center flex-col gap-4 p-8 rounded-md hover:bg-blue-200"
    >
      <div>
        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
          <FaEnvelopeOpenText />
          Email me for Jobs
        </h3>
        <p className="text-primary/75 text-base mb-4">
          Looking for new opportunities? Email me to explore job openings and career options tailored to your skills and ambitions. Let's connect and find the perfect role for you!
        </p>
        <form onSubmit={handleFormSubmit} className="w-full space-y-4">
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="name@mail.com"
            className="w-full block py-2 pl-3 border focus:outline-none"
            required
          />
          <motion.input
            variants={buttonVariants}
            whileHover="hover"
            type="submit"
            value="Subscribe"
            className="w-full block py-2 pl-3 border focus:outline-none bg-blue rounded-sm text-white cursor-pointer font-semibold"
          />
        </form>
        {isSent && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-green-500 mt-2"
          >
            Email sent successfully!
          </motion.div>
        )}
      </div>

      {/* Second part */}
      <div className="mt-20">
        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
          <FaRocket />
          Get noticed faster!
        </h3>
        <p className="text-primary/75 text-base mb-4">
          Want to get noticed faster? Email me your resume to explore exciting job opportunities and kickstart your career today!
        </p>
        <div className="w-full space-y-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf"
            style={{ display: 'none' }}
          />
          <motion.input
            variants={buttonVariants}
            whileHover="hover"
            type="button"
            value="Upload your resume"
            onClick={handleUploadClick}
            className="w-full block py-2 pl-3 border focus:outline-none bg-blue rounded-sm text-white cursor-pointer font-semibold"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Newsletter;
