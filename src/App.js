import React, { useState, useEffect } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
// import { data } from "./data";

const url = "https://course-api.com/react-tabs-project";

function App() {
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(0);
  const [jobs, setJobs] = useState([]);

  const fetchJobss = async () => {
    try {
      setLoading(true);
      const res = await fetch(url);
      const data = await res.json();
      setLoading(false);
      setJobs(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJobss();
  }, []);

  const handleCompanyFilter = (index) => {
    setValue(() => index);
  };

  if (loading) {
    return (
      <section className="section loading">
        <h1>Loading...</h1>
      </section>
    );
  }

  const { title, dates, duties, company } = jobs[value];

  return (
    <section className="section">
      <div className="title">
        <h2 className="">Experiance</h2>
        <div className="underline"></div>
      </div>

      <div className="jobs-center">
        <div className="btn-container">
          {jobs.map((item, index) => {
            return (
              <button
                key={item.id}
                className={`job-btn ${index === value && "active-btn"}`}
                onClick={() => handleCompanyFilter(index)}
              >
                {item.company}
              </button>
            );
          })}
        </div>

        {/* job description */}
        <article className="job-info">
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className="job-date">{dates}</p>

          {duties.map((duty, index) => {
            return (
              <div className="job-desc" key={index}>
                <FaAngleDoubleRight className="job-icon" />
                <p>{duty}</p>
              </div>
            );
          })}
        </article>
      </div>
      <button type="button" className="btn">
        more info
      </button>
    </section>
  );
}

export default App;
