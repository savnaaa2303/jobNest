import React from 'react'
import Location from './Location'
import Salary from './Salary'
import JobPostingData from '../Components/JobPostingData'
import WorkExperience from './WorkExperience'

import EmploymentType from './EmploymentType'
import { motion } from 'framer-motion'
const Sidebar = ({handleChange, handleClick}) => {
  return (
    <motion.div whileInView={{y:0,opacity:1}}
    initial={{y:-300,opacity:0}}
    transition={{duration:2}} className='space-y-5 '>
        <h3 className='text-lg font-bold mb-2'>Filters</h3>
      
        <Location handleChange={handleChange}/>

        <Salary handleChange={handleChange} handleClick= {handleClick}/>

        <JobPostingData handleChange={handleChange}/>

        <WorkExperience handleChange={handleChange}/>

        <EmploymentType handleChange={handleChange}/>



    </motion.div>
  )
}

export default Sidebar