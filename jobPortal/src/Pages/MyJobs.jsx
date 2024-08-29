import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";


const MyJobs = () => {
  const email = "rssnow284@gmail.com";
  const [jobs, setJobs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);


  // set current page 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;


  useEffect(() => {
    setIsLoading(true);
    fetch(`${import.meta.env.VITE_BASE_URL}myJobs/pratyushnarayan17@gmail.com`)
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
    setIsLoading(false);

      });
  }, [searchText]);

  // pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = jobs.slice(indexOfFirstItem, indexOfLastItem)

  //next btn and prev btn
  const nextPage= () =>{
    if(indexOfLastItem < jobs.length){
      setCurrentPage(currentPage + 1)
    }
  }

   const prevPage = () =>{
    if(currentPage >1){
      setCurrentPage(currentPage - 1)
    }
   }


  const handleSearch = () => {
    const filter = jobs.filter(
      (job) =>
        job.jobTitle.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
    );
    // console.log(filter)
    setJobs(filter);
    setIsLoading(false);
  };

  const handleDelete = (id) => {
    // console.log(id)
    fetch(`${import.meta.env.VITE_BASE_URL}job/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json)
      .then((data) => {
        if (data.acknowledged === true) {
          alert("job deleted successfully!!!");
        }
      });
  };

  // console.log(searchText);

  const buttonVariants = {
    hover: {
      scale: 1.1,
      textShadow: "0px 0px 8px rgb(255,255,255)",
      boxShadow: "0px 0px 8px rgb(255,255,255)",
      transition: {
        duration: 0.3,
        yoyo: Infinity
      },
    },
  };


  const container = {
    hidden: {
      opacity: 0,
      scale: 0,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div    className="mx-w-screen-2xl container mx-auto xl:px-24 px-4">
      <motion.div className="my=jobs-container"   whileInView={{ x: 0, opacity: 1 }}
      initial={{ x: -300, opacity: 0 }}
      transition={{ duration: 2 }}>
        <h1 className="text-center p-4">All My Jobs</h1>
        <div className="search-box p-2 text-center mb-2">
          <input
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
            name="Search"
            id="Search"
            className="py-2 pl-3 border focus:outline-none lg:w-6/12 mb-4"
          />

          <motion.button variants={buttonVariants}
            whileHover="hover"
            className="bg-blue text-white font-semibold px-8 py-2 rounded-sm mb-4"
            onClick={handleSearch}
          >
            Search
          </motion.button>
        </div>
      </motion.div>


      {/* table */}
      <motion.section initial={{ scale: 0 }}
  whileInView={{ scale: 1 }}
  transition={{ duration: 0.5 }} className="py-1 bg-blueGray-50">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-5">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">
                    All Jobs
                  </h3>
                </div>
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <Link to="/post-job">
                    <button
                      className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                      Post A New Job
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse ">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      NO.
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      TITLE
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      COMPANY NAME
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      SALARY
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      EDIT
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      DELETE
                    </th>
                  </tr>
                </thead>

                {isLoading ? (
                  <div className="flex items-center justify-center h-20">
                    <p>loading.....</p>
                  </div>
                ) : (
                  <tbody>
                    {currentJobs.map((job, index) => (
                      <tr key={index}>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                          {index + 1}
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                          {job.jobTitle}
                        </td>
                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {job.companyName}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          ${job.minPrice} --${job.maxPrice}
                        </td>
                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <button>
                            <Link to={`/edit-job/${job?._id}`}>Edit</Link>
                          </button>
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 placeholder:">
                          <button
                            onClick={() => handleDelete(job._id)}
                            className="bg-red py-2 px-6 text-black rounded-sm "
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}




              </table>
            </div>
          </div>
        </div>
        
        {/* pagination */}
        <div className="flex justify-center text-black space-x-8 mb-8">
          {
            currentPage > 1 && (
             <button  className="hover:underline" onClick={prevPage}>Previous</button>
            )
          }
          {
            indexOfLastItem < jobs.length && (
              <button className="hover:underline" onClick={nextPage}>Next</button>
            )
          }

        </div>

      </motion.section>
    </div>
  );
};

export default MyJobs;